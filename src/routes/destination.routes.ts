import express, { NextFunction, Request, Response } from 'express';
import { Destination, IDestination } from '../models/destination.model';
import mongoose, { Document } from 'mongoose';

const destinationRouter = express.Router();

// Interfaz extendida de Request para incluir destination
interface CustomRequest extends Request {
  destination?: Document<unknown, {}, IDestination> & IDestination;
}

// Middleware para obtener un destino por ID
const getDestination = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Destination not found or invalid id.' });
    return;
  }

  try {
    const destination = await Destination.findById(id).exec();

    if (!destination) {
      res.status(404).json({ message: 'Destination not found.' });
      return;
    }

    req.destination = destination;
    next(); // Llamamos a next() sin retornar nada
  } catch (err) {
    next(err); // Pasamos el error a Express para que lo maneje
  }
};

// Obtener todos los destinos
destinationRouter.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
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
  },
);

// Crear un nuevo destino
destinationRouter.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        title,
        description,
        subTitle,
        thumbnailImgUrl,
        fullImgUrl,
        price,
        duration,
        activities,
        physicalLevel,
        groupSize,
        ageLimit,
        season,
        climate,
        includes,
        notIncluded,
        reviews,
        topReviews,
        faq,
        similarDestinations,
      } = req.body;

      if (
        !title ||
        !description ||
        !subTitle ||
        typeof price !== 'number' ||
        !duration ||
        !Array.isArray(activities) ||
        !['relaxed', 'moderate', 'active', 'intense', 'mixed options'].includes(
          physicalLevel,
        ) ||
        typeof groupSize !== 'number' ||
        typeof ageLimit !== 'number' ||
        !Array.isArray(season) ||
        !Array.isArray(climate) ||
        !Array.isArray(includes) ||
        !Array.isArray(notIncluded) ||
        !Array.isArray(reviews) ||
        !Array.isArray(topReviews) ||
        !Array.isArray(faq) ||
        !Array.isArray(similarDestinations)
      ) {
        res.status(400).json({ message: 'Invalid or missing fields' });
        return;
      }

      const destination = new Destination({
        title,
        subTitle,
        description,
        thumbnailImgUrl,
        fullImgUrl,
        price,
        duration,
        activities,
        physicalLevel,
        groupSize,
        ageLimit,
        season,
        climate,
        includes,
        notIncluded,
        reviews,
        topReviews,
        faq,
        similarDestinations,
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
  },
);

// Obtener un destino por ID con middleware
destinationRouter.get('/:id', getDestination, (req: CustomRequest, res) => {
  res.json(req.destination);
});

destinationRouter.put(
  '/:id',
  getDestination,
  async (req: CustomRequest, res) => {
    try {
      const destination = req.destination;
      destination!.title = req.body.title || '';

      const updatedDestination = await destination?.save();
      res.json(updatedDestination);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
        return;
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
        return;
      }
    }
  },
);

//Todo: add patch, check for changes before continue

destinationRouter.delete(
  '/:id',
  getDestination,
  async (req: CustomRequest, res) => {
    try {
      const destination = req.destination;
      await destination!.deleteOne({
        _id: destination!._id,
      });

      res.json({
        message: `${destination!.title} destination was deleted.`,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
        return;
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
        return;
      }
    }
  },
);

export default destinationRouter;
