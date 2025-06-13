import React, { FC, Suspense } from "react";
import { Section } from "components/section";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import { BookingItem } from "components/booking/item";
import { fargoBookingState } from "state";

export const BookingListContent: FC = () => {
  const fargoBooking = useRecoilValue(fargoBookingState);

  return (
    <Section
      title="现舱推荐"
      className="px-6 pt-4 pb-6"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Box className="grid grid-cols-1 gap-4 mt-4">
        {fargoBooking?.map((booking) => (
          <BookingItem key={booking.id} data={booking} />
        ))}
        <Box className="flex items-center justify-center text-sm text-gray-500">
          <Box className="flex-1 h-px bg-[#87767654] ms-5"></Box>
          <span className="px-4 text-center text-gray-500">
            快去运价查询发现更多数据~
          </span>
          <Box className="flex-1 h-px bg-[#87767654] me-5"></Box>
        </Box>
      </Box>
    </Section>
  );
};

export const BookingListFallback: FC = () => {
  return (
    <Section
      title="现舱推荐"
      className="px-6 pt-4 pb-6 h-full"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Box className="flex items-start mt-10 justify-center h-full">
        <img src="/assets/icons/icon-empty.png" />
      </Box>
    </Section>
  );
};

export const BookingList: FC = () => {
  return (
    <Suspense fallback={<BookingListFallback />}>
      <BookingListContent />
    </Suspense>
  );
};
