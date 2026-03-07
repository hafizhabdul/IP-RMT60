const { Alumni } = require("../models");

class AlumniController {
  static async list(req, res, next) {
    try {
      const alumni = await Alumni.findAll({
        order: [['year', 'DESC'], ['name', 'ASC']]
      });
      res.json(alumni);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const { name, method, year, company } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const alumni = await Alumni.create({ name, method, year, company });
      res.status(201).json(alumni);
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const alumni = await Alumni.findByPk(id);
      if (!alumni) return res.status(404).json({ message: "Alumni not found" });

      await alumni.update(req.body);
      res.json(alumni);
    } catch (err) {
      next(err);
    }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      const alumni = await Alumni.findByPk(id);
      if (!alumni) return res.status(404).json({ message: "Alumni not found" });

      await alumni.destroy();
      res.json({ message: "Alumni deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AlumniController;
