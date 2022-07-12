export interface IUser {}

export type Nullable<T> = T | null;

export interface IShow {
  id: string;
  title: string;
  app: string;
  review: string;
  rating: number;
  enteredAt: string;
  userId: string;
}
