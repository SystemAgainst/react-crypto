import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
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

const mapAssets = (assets, result) => {
  return assets.map((asset) => {
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
};

export const CryptoContextProvider = ({ children }: CryptoContextProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState<ICrypto['result']>([]);
  const [assets, setAssets] = useState<IAsset[]>([]);

  useEffect(() => {
    const preload = async () => {
      setLoading(true);
      const { result } = (await fakeFetchCrypto()) as ICrypto;
      const fetchedAssets = (await fetchAssets()) as IAsset[];

      setAssets(mapAssets(fetchedAssets, result));
      setCrypto(result);
      setLoading(false);
    };

    preload();
  }, []);

  const addAsset = (newAsset) => {
    setAssets((prev) => mapAssets([...prev, newAsset], crypto));
  };

  return <CryptoContext.Provider value={{ loading, crypto, assets, addAsset }}>{children}</CryptoContext.Provider>;
};

export const useCrypto = () => {
  return useContext(CryptoContext);
};
