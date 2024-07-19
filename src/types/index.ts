import { ICrypto } from './ICrypto';
import { IAsset } from './IAsset';

interface ICryptoContext {
  assets: (IAsset & { grow?: boolean; growPercentage?: number; totalAmount?: number; totalProfit?: number })[];
  crypto: ICrypto['result'];
  loading: boolean;
}

export type { ICrypto, IAsset, ICryptoContext };
