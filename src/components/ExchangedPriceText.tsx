import { useExchangeRate } from '@/remote/getExchangeRate';
import { useCurrency } from '@/store/currency';

const krwFormatter = new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', maximumFractionDigits: 0 });
const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

/**
 * @param price 달러 베이스
 */
export function ExchangedPriceText({ price }: { price: number }) {
  const { data } = useExchangeRate();
  const { currency } = useCurrency();

  if (data == null) {
    return null;
  }

  const exchangeRate = data.exchangeRate.KRW / data.exchangeRate.USD;

  if (currency === 'KRW') {
    return <>{krwFormatter.format(price * exchangeRate)}</>;
  }

  if (currency === 'USD') {
    return <>{usdFormatter.format(price)}</>;
  }

  return null;
}
