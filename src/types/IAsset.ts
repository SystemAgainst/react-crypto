import { Dayjs } from 'dayjs';

export interface IAsset {
  id: string;
  amount: number;
  price: number;
  date: Dayjs;
}
