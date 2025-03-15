import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: string;
  rating: number;
  comment: string;
  date: Date;
}

const ReviewSchema = new Schema<IReview>({
  user: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
