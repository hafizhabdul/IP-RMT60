const { Schedule } = require('../models');

class EventController {
  static async list(req, res, next) {
    try {
      const schedules = await Schedule.findAll({
        order: [['startDate', 'ASC']]
      });
      res.json(schedules);
    } catch (err) { next(err); }
  }

  static async create(req, res, next) {
    try {
      const { title, method, startDate, endDate, time, location, image } = req.body;
      if (!title || !method || !startDate) {
        return res.status(400).json({ message: 'title, method, and startDate are required' });
      }
      const schedule = await Schedule.create({
        title,
        method,
        startDate,
        endDate: endDate || startDate,
        time: time || '',
        location: location || '',
        image: image || ''
      });
      res.status(201).json(schedule);
    } catch (err) { next(err); }
  }

  static async update(req, res, next) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findByPk(id);
      if (!schedule) return res.status(404).json({ message: 'Event not found' });
      
      await schedule.update(req.body);
      res.json(schedule);
    } catch (err) { next(err); }
  }

  static async remove(req, res, next) {
    try {
      const { id } = req.params;
      const schedule = await Schedule.findByPk(id);
      if (!schedule) return res.status(404).json({ message: 'Event not found' });
      
      await schedule.destroy();
      res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
  }
}

module.exports = EventController;

