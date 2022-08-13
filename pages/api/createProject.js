import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

const createProject = async (req, res) => {
  const { pname: name, description } = req.body;

  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        user: {
          connect: {
            email: session.user.email,
          }
        }
      },
    });
    res.status(200).json(newProject);
  } catch (e) {
    res.status(403).json({ err: e });
  }
};

export default createProject;
