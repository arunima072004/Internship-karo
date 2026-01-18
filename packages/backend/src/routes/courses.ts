import { Router } from 'express';

export const courseRoutes = Router();

courseRoutes.get('/', async (req, res) => {
  // TODO: Implement course listing
  res.status(501).json({ error: 'Course listing not implemented yet' });
});

courseRoutes.get('/:id', async (req, res) => {
  // TODO: Implement course details
  res.status(501).json({ error: 'Course details not implemented yet' });
});

courseRoutes.post('/:id/enroll', async (req, res) => {
  // TODO: Implement course enrollment
  res.status(501).json({ error: 'Course enrollment not implemented yet' });
});
