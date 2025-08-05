import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUserWithGoogle = async (req, res) => {
  try {
    const { email, name, googleId } = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await prisma.user.findUnique({
      where: { googleId },
    });

    // Sinon on le crée
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
          role: 'patient', // rôle par défaut
        },
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Erreur lors de la création de l’utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
};
