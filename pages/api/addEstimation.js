import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const addEstimation = async (req, res) => {
  const { estimation, requirementId } = req.body;

  let dateKey = `date_${requirementId}`;
  let timeKey = `time_${requirementId}`;

  try {
    await prisma.estimation
      .create({
        data: {
          date: estimation[dateKey],
          time: estimation[timeKey],
          requirementId,
        },
      })
      .then((newEstimation) => {
        prisma.requirement
          .update({
            where: { id: requirementId },
            data: { status: "inprogress" },
          })
          .then((result) => {
            res.status(200).json(newEstimation);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (e) {
    res.status(403).json({ err: e });
  }
};

export default addEstimation;
