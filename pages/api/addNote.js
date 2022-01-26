import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addNote = async (req, res) => {
  const { value, requirementId } = req.body;

  try {
    const newNote = await prisma.note.create({
      data: {
        value,
        requirementId,
      },
    });
    res.status(200).json(newNote);
  } catch (e) {
    console.log(e);
    res.status(403).json({ err: e });
  }
};

export default addNote;
