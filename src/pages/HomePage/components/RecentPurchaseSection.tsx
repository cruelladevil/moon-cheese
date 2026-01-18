import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { ExchangedPriceText } from '@/components/ExchangedPriceText';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorSection from '@/components/ErrorSection';
import { Suspense } from 'react';
import { useRecentProducts } from '@/remote/getRecentProductList';
import { countBy, uniqBy } from 'es-toolkit';

function RecentPurchaseSection() {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => <ErrorSection onRetry={resetErrorBoundary} />}
            >
              <Suspense fallback={null}>
                <RecentPurchaseProducts />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;

function RecentPurchaseProducts() {
  const {
    data: { recentProducts },
  } = useRecentProducts();

  const recentProductsUniqById = uniqBy(recentProducts, product => product.id);
  const recentProductCountById = countBy(recentProducts, product => product.id);

  return (
    <>
      {recentProductsUniqById.map(product => (
        <RecentProduct
          key={product.id}
          thumbnail={product.thumbnail}
          name={product.name}
          price={product.price * recentProductCountById[product.id]}
        />
      ))}
    </>
  );
}

function RecentProduct({ thumbnail, name, price }: { thumbnail: string; name: string; price: number }) {
  return (
    <Flex css={{ gap: 4 }}>
      <styled.img
        src={thumbnail}
        alt="item"
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{name}</Text>
        <Text variant="H1_Bold">
          <ExchangedPriceText price={price} />
        </Text>
      </Flex>
    </Flex>
  );
}
