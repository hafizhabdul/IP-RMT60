const fs = require('fs');
const path = require('path');

const EVENTS_FILE = path.join(__dirname, '..', 'data', 'events.json');

async function readEvents() {
  try {
    const raw = await fs.promises.readFile(EVENTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

async function writeEvents(events) {
  const content = JSON.stringify(events, null, 2);
  await fs.promises.writeFile(EVENTS_FILE, content, 'utf8');
}

class EventController {
  static async list(req, res, next) {
    try {
      const events = await readEvents();
      res.json(events);
    } catch (err) { next(err); }
  }

  static async create(req, res, next) {
    try {
      const { title, method, startDate, endDate, time, location, image } = req.body;
      if (!title || !method || !startDate) {
        return res.status(400).json({ message: 'title, method, and startDate are required' });
      }
      const events = await readEvents();
      const id = Date.now();
      const ev = { id, title, method, startDate, endDate: endDate || startDate, time: time || '', location: location || '', image: image || '' };
      events.push(ev);
      await writeEvents(events);
      res.status(201).json(ev);
    } catch (err) { next(err); }
  }

  static async update(req, res, next) {
    try {
      const id = String(req.params.id);
      const events = await readEvents();
      const idx = events.findIndex(e => String(e.id) === id);
      if (idx === -1) return res.status(404).json({ message: 'Event not found' });
      events[idx] = { ...events[idx], ...req.body, id: events[idx].id };
      await writeEvents(events);
      res.json(events[idx]);
    } catch (err) { next(err); }
  }

  static async remove(req, res, next) {
    try {
      const id = String(req.params.id);
      const events = await readEvents();
      const filtered = events.filter(e => String(e.id) !== id);
      if (filtered.length === events.length) return res.status(404).json({ message: 'Event not found' });
      await writeEvents(filtered);
      res.json({ message: 'Deleted' });
    } catch (err) { next(err); }
  }
}

module.exports = EventController;

