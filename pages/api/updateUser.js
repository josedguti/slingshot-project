import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (req, res) => {
  const { role, email } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        role,
      },
    });
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(403).json({ err: e });
  }
};

export default updateUser;
