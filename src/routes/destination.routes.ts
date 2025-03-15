import express, { NextFunction, Request, Response } from 'express';
import { Destination } from '../models/destination.model';

const router = express.Router();

//Middleware
const getDestination = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let destination;
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: 'Destination ID is not valid.',
    });
  }

  try {
    destination = await Destination.findById(id);
    if (!destination) {
      return res.status(404).json({
        message: 'Destination not found.',
      });
    }
    (req as any).destination = destination;
    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: err.message,
      });
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
      return;
    }
  }
};

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const destinations = await Destination.find();

    if (destinations.length === 0) {
      res.status(200).json({ message: 'Destinations DB empty' });
      return;
    }

    res.status(200).json(destinations);
    return;
  } catch (err: unknown) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
      return;
    } else {
      res.status(500).json({ message: 'Unknown error occurred' });
      return;
    }
  }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      title,
      description,
      price,
      duration,
      activities,
      physicalLevel,
      groupSize,
      ageLimit,
      season,
      includes,
      notIncluded,
      reviews,
      topReviews,
      faq,
      similarDestinatios,
    } = req.body;

    if (
      !title ||
      !description ||
      typeof price !== 'number' ||
      !duration ||
      !Array.isArray(activities) ||
      !['relaxed', 'moderate', 'active', 'intense'].includes(physicalLevel) ||
      typeof groupSize !== 'number' ||
      typeof ageLimit !== 'number' ||
      !Array.isArray(season) ||
      !Array.isArray(includes) ||
      !Array.isArray(notIncluded) ||
      !Array.isArray(reviews) ||
      !Array.isArray(topReviews) ||
      !Array.isArray(faq) ||
      !Array.isArray(similarDestinatios)
    ) {
      res.status(400).json({ message: 'Invalid or missing fields' });
      return;
    }

    const destination = new Destination({
      title,
      description,
      price,
      duration,
      activities,
      physicalLevel,
      groupSize,
      ageLimit,
      season,
      includes,
      notIncluded,
      reviews,
      topReviews,
      faq,
      similarDestinatios,
    });

    const newDestination = await destination.save();
    res.status(201).json(newDestination);
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
      return;
    } else {
      res.status(400).json({ message: 'An unknown error occurred' });
      return;
    }
  }
});

export default router;
