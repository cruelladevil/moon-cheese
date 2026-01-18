import type { CurrencyType } from '@/ui-lib';
import { create } from 'zustand';

type CurrencyState = { currency: CurrencyType };

type CurrencyAction = {
  setCurrency: (currency: CurrencyType) => void;
};

type CurrencyStore = CurrencyState & CurrencyAction;

export const useCurrency = create<CurrencyStore>(set => ({
  currency: 'KRW',
  setCurrency: currency => set({ currency }),
}));
