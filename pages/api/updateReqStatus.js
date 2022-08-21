import { prisma } from "../../lib/prisma";

export default async (req, res) => {
  if (req.method === "PUT") {
    const { status, requirementId } = req.body;
    try {
      if (status != "completed") {
        res.status(422).json("Invalid status type");
      } else {
        prisma.requirement
          .findUnique({
            where: {
              id: requirementId,
            },
          })
          .then((requirement) => {
            if (requirement.status === "inprogress") {
              prisma.requirement
                .update({
                  where: {
                    id: requirementId,
                  },
                  data: {
                    status: status,
                  },
                })
                .then((result) => {
                  res.status(200).json("Updated successfully");
                })
                .catch((err) => {
                  res.status(500).json(err);
                });
            } else if (requirement.status === "completed") {
              res.status(406).json("Requirement already completed");
            } else {
              res.status(406).json("Invalid call");
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    } catch (e) {
      res.status(403).json({ err: e });
    }
  } else {
    res.status(400).json("Invalid Request");
  }
};
