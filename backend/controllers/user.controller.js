import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// ✅ Connexion
export const loginUser = async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      return res.status(404).json({ error: "Vous n’êtes pas inscrit." });
    }

    return res.status(200).json({ message: `Bonjour ${existingUser.name}`, user: existingUser });
  } catch (error) {
    console.error('Erreur de connexion :', error);
    return res.status(500).json({ error: 'Erreur de connexion.' });
  }
};

// ✅ Inscription
export const registerUser = async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "Vous possédez déjà un compte." });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        googleId,
        role: 'patient' // valeur par défaut
      }
    });

    return res.status(201).json({ message: `Bienvenue ${name}`, user: newUser });
  } catch (error) {
    console.error('Erreur lors de l’inscription :', error);
    return res.status(500).json({ error: 'Erreur lors de l’inscription.' });
  }
};
