// @ts-nocheck
import React, { FC, Suspense, useEffect, useState } from "react";
import { Section } from "@/components/section";
import { useRecoilValue } from "recoil";
import { Box } from "zmp-ui";
import { BookingItem } from "@/components/booking/item";
import { useTranslation } from "react-i18next";
import * as fargoSeaService from "@/services/freight-sea";

export const BookingListContent: FC = () => {
  const { t } = useTranslation();
  const [fargoList, setFargoList] = useState<any[]>([]);

  const fetchFargoList = async () => {
    const res = await fargoSeaService.getListFreightSea();
    if (res.message === "success") {
      setFargoList(res.data);
    } else { 
      setFargoList([]);
    }
  }

  useEffect(() => {
    fetchFargoList();
  }, []);

  return (
    <Section
      title={t("Recommend")}
      className="px-6 pt-4 pb-6"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Box className="grid grid-cols-1 gap-4 mt-4">
        {!!fargoList?.length ? (
          fargoList?.map((booking) => (
            <BookingItem key={booking.id} data={booking} />
          ))
        ) : (
          <Box className="flex items-start mt-10 justify-center h-full">
            <img src="/assets/icons/icon-empty.png" />
          </Box>
        )}
        <Box className="flex items-center justify-center text-sm text-gray-500">
          <Box className="flex-1 h-px bg-[#87767654] ms-5"></Box>
          <span className="px-4 text-center text-gray-500">
            {t("Go to find more data")}
          </span>
          <Box className="flex-1 h-px bg-[#87767654] me-5"></Box>
        </Box>
      </Box>
    </Section>
  );
};

export const BookingListFallback: FC = () => {
  const { t } = useTranslation();
  return (
    <Section
      title={t("Recommend")}
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
