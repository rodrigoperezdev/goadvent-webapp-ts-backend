import { FAQ } from './faq.model';
import { Review } from './review.model';

export interface Destination {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  activities: string[];
  physicalLevel: 'relaxed' | 'moderate' | 'active' | 'intense';
  groupSize: number;
  ageLimit: number;
  season: ('winter' | 'spring' | 'summer' | 'fall' | 'all')[];
  includes: string[];
  notIncluded: string[];
  reviews: Review[];
  topReviews: Review[];
  faq: FAQ[]; //
  similarTours: string[];
}
