import { prisma } from "../../lib/prisma";

const deleteReq = async (req, res) => {
  const { reqId } = req.body;

  try {
    await prisma.requirement.delete({
      where: {
        id: reqId,
      },
    });
    res.status(200).json();
  } catch (e) {
    console.log(e);
    res.status(403).json({ err: e });
  }
};

export default deleteReq;
