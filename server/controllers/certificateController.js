const { Certificate, LearningPath, User } = require('../models');

class CertificateController {
  static async listMine(req, res, next) {
    try {
      const certs = await Certificate.findAll({
        where: { UserId: req.user.id },
        include: [{ model: LearningPath, as: 'learningPath', attributes: ['id', 'code', 'title', 'method', 'level'] }],
        order: [['issuedAt', 'DESC']]
      });
      res.status(200).json({ success: true, certificates: certs.map((c) => c.toJSON()) });
    } catch (err) {
      next(err);
    }
  }

  static async verify(req, res, next) {
    try {
      const { qrToken } = req.params;
      const cert = await Certificate.findOne({
        where: { qrToken },
        include: [
          { model: LearningPath, as: 'learningPath', attributes: ['code', 'title', 'method', 'level'] },
          { model: User, as: 'user', attributes: ['id', 'username'] }
        ]
      });
      if (!cert) throw { name: 'NotFound', message: 'Certificate not found' };
      res.status(200).json({
        success: true,
        certificate: {
          serialNumber: cert.serialNumber,
          score: cert.score,
          issuedAt: cert.issuedAt,
          path: cert.learningPath,
          recipient: { id: cert.user.id, username: cert.user.username },
          valid: true
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CertificateController;
