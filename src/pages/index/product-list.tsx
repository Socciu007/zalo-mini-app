import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import { ProductItem } from "components/product/item";
import { ProductItemSkeleton } from "components/skeletons";
import { productsState } from "state";
import { fargoBookingState } from "state";

export const ProductListContent: FC = () => {
  const products = useRecoilValue(productsState);
  const fargoBooking = useRecoilValue(fargoBookingState);
  console.log(products);

  console.log(fargoBooking);

  return (
    <Section
      title="xxxxx"
      className="px-6 pt-4 pb-6"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Box className="grid grid-cols-1 gap-4 mt-4">
        {fargoBooking?.map((booking) => (
          <ProductItem key={booking.id} data={booking} />
        ))}
        <Box className="flex items-center justify-center text-sm text-gray-500">
          <Box className="flex-1 h-px bg-gray-200"></Box>
          <span className="px-4 text-gray-500">快去运价查询发现更多数据~</span>
          <Box className="flex-1 h-px bg-gray-200"></Box>
        </Box>
      </Box>
    </Section>
  );
};

export const ProductListFallback: FC = () => {
  return (
    <Section
      title="xxx"
      className="px-6 pt-4 pb-6 h-full"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Box className="flex items-center justify-center h-full">
        <img src="/assets/icons/icon-empty.png" />
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
