import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { email, role, name, googleId } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email,
        role,
        name,
        googleId
      }
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erreur lors de la création de l’utilisateur :', error);
    res.status(500).json({ error: 'Erreur lors de la création de l’utilisateur' });
  }
};
