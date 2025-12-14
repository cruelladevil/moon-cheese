import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { ExchangedPriceText } from '@/components/ExchangedPriceText';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorSection from '@/components/ErrorSection';
import { Suspense } from 'react';
import { useRecentProducts } from '@/remote/getRecentProductList';

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

  return (
    <>
      {recentProducts.map(product => (
        <RecentProduct key={product.id} {...product} />
      ))}
      <Flex
        css={{
          gap: 4,
        }}
      >
        <styled.img
          src="/moon-cheese-images/cheese-1-1.jpg"
          alt="item"
          css={{
            w: '60px',
            h: '60px',
            objectFit: 'cover',
            rounded: 'xl',
          }}
        />
        <Flex flexDir="column" gap={1}>
          <Text variant="B2_Medium">월레스의 오리지널 웬슬리데일</Text>
          <Text variant="H1_Bold">
            <ExchangedPriceText price={12.99} />
          </Text>
        </Flex>
      </Flex>
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
