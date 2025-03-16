import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  title: string;
  thumbnailImgUrl: string;
  fullImgUrl: string;
  description: string;
  price: number;
  duration: string;
  activities: string[];
  physicalLevel:
    | 'relaxed'
    | 'moderate'
    | 'active'
    | 'intense'
    | 'mixed options';
  groupSize: number;
  ageLimit: number;
  season: ('winter' | 'spring' | 'summer' | 'fall' | 'all')[];
  climate:
    | 'cold'
    | 'warm'
    | 'tropical'
    | 'desert'
    | 'snow'
    | 'mountain'
    | 'moderated hot'
    | 'super hot';
  includes: string[];
  notIncluded: string[];
  reviews: mongoose.Types.ObjectId[];
  topReviews: mongoose.Types.ObjectId[];
  faq: mongoose.Types.ObjectId[];
  similarDestinations: mongoose.Types.ObjectId[];
}

const DestinationSchema = new Schema<IDestination>(
  {
    title: { type: String, required: true },
    thumbnailImgUrl: { type: String, required: false },
    fullImgUrl: { type: String, required: false },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    activities: [{ type: String, required: true }],
    physicalLevel: {
      type: String,
      enum: ['relaxed', 'moderate', 'active', 'intense', 'mixed options'],
      required: true,
    },
    climate: {
      type: String,
      enum: [
        'cold',
        'warm',
        'tropical',
        'desert',
        'snow',
        'mountain',
        'moderated hot',
        'super hot',
      ],

      required: true,
    },
    groupSize: { type: Number, required: true },
    ageLimit: { type: Number, required: true },
    season: {
      type: [String],
      enum: ['winter', 'spring', 'summer', 'fall', 'all'],
      required: true,
    },
    includes: [{ type: String, required: true }],
    notIncluded: [{ type: String, required: true }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    topReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    faq: [{ type: Schema.Types.ObjectId, ref: 'FAQ' }],
    similarDestinations: [{ type: Schema.Types.ObjectId, ref: 'Destination' }],
  },
  { timestamps: true },
);

export const Destination = mongoose.model<IDestination>(
  'Destination',
  DestinationSchema,
);
