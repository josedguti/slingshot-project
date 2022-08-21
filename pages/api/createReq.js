import { prisma } from "../../lib/prisma";

const createReq = async (req, res) => {
  if (req.method === "POST") {
    const { value, projectId } = req.body;

    try {
      const newRequirement = await prisma.requirement.create({
        data: {
          value,
          projectId,
        },
      });
      res.status(200).json(newRequirement);
    } catch (e) {
      res.status(403).json({ err: e });
    }
  } else if (req.method === "PUT") {
    const { value, requirementId } = req.body;

    try {
      prisma.requirement
        .findUnique({
          where: {
            id: requirementId,
          },
        })
        .then((requirement) => {
          if (requirement.status === "inprogress") {
            res.status(406).json("Requirement in progress, can't update now");
          } else if (requirement.status === "completed") {
            res.status(406).json("Requirement already completed");
          } else {
            prisma.requirement
              .update({
                where: {
                  id: requirementId,
                },
                data: {
                  value: value,
                },
              })
              .then((result) => {
                res.status(200).json("Updated successfully");
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          }
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    } catch (e) {
      res.status(403).json({ err: e });
    }
  } else {
    res.status(400).json("Invalid Request");
  }
};

export default createReq;
