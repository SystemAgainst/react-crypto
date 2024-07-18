import { createContext, useEffect, useState, ReactNode } from 'react';
import { ICrypto, IAsset, ICryptoContext } from '../types';
import { fakeFetchCrypto, fetchAssets } from '../api';
import { calculatePercentageDifference } from '../utlis';

interface CryptoContextProviderProps {
  children: ReactNode;
}

export const CryptoContext = createContext<ICryptoContext>({
  assets: [],
  crypto: [],
  loading: false,
});

export const CryptoContextProvider = ({ children }: CryptoContextProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<ICrypto[]>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const { result } = (await fakeFetchCrypto()) as ICrypto;
      const fetchedAssets = (await fetchAssets()) as IAsset[];

      const enrichedAssets = fetchedAssets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id);

        if (!coin) {
          return {
            ...asset,
            grow: false,
            growPercentage: 0,
            totalAmount: 0,
            totalProfit: 0,
          };
        }

        return {
          ...asset,
          grow: asset.price < coin.price,
          growPercentage: calculatePercentageDifference(asset.price, coin.price),
          totalAmount: asset.amount * coin.price,
          totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        };
      });

      setAssets(enrichedAssets);
      setCrypto(result);
      setLoading(false);
    };

    preload();
  }, []);

  return <CryptoContext.Provider value={{ loading, crypto, assets }}>{children}</CryptoContext.Provider>;
};

export default CryptoContext;
