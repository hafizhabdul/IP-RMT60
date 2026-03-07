const { Transaction, TransactionDetail } = require("../models");

async function checkCourseAccess(req, res, next) {
  try {
    const { id } = req.params;
    const UserId = req.user.id;

    const transaction = await Transaction.findOne({
      where: {
        UserId,
        status: "Completed",
      },
      include: [
        {
          model: TransactionDetail,
          where: { LectureId: id },
        },
      ],
    });

    if (!transaction) {
      throw {
        name: "Forbidden",
        message: "Please complete payment to access this course",
      };
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = { checkCourseAccess };
