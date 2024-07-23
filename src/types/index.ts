import { ICrypto } from './ICrypto';
import { IAsset } from './IAsset';

interface ICryptoContext {
  assets: IAsset[];
  crypto: ICrypto['result'];
  loading: boolean;
  grow?: boolean;
  growPercentage?: number;
  totalAmount?: number;
  totalProfit?: number;
  addAsset?: (newAsset: IAsset) => void; // Добавляем addAsset сюда
}

export type { ICrypto, IAsset, ICryptoContext };
