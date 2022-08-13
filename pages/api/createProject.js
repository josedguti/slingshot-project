import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProject = async (req, res) => {
  const { pname: name, description } = req.body;

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
      },
    });
    res.status(200).json(newProject);
  } catch (e) {
    res.status(403).json({ err: e });
  }
};

export default createProject;
