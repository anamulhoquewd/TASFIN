import { IImage } from "../global";

export interface ITestimonial {
  _id: string;
  name: string;
  location: string;
  message: string;
  rating: number;
  avatar?: IImage;

  createdAt: Date;
}
