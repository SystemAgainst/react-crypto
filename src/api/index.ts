import { cryptoData, cryptoAssets } from '../data.ts';
import { ICrypto } from '../types/ICrypto.ts';
import { IAsset } from '../types/IAsset.ts';

export const fakeFetchCrypto = (): Promise<ICrypto> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoData);
    }, 200);
  });
};

export const fetchAssets = (): Promise<IAsset[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 200);
  });
};
