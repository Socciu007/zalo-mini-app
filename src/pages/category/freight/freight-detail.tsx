import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { freightIndexState, freightSeaState } from "state";
import { Page, Header, Box, Text } from "zmp-ui";

const InfoGeneral: FC<{ freightDetail: any }> = ({ freightDetail }) => {
  const { t } = useTranslation();
  return (
    <Box className="flex flex-col px-6 pb-6 mt-6 bg-white">
      <Box className="flex justify-between my-2">
        <Text className="text-xs">
          {t("Sailing Date")}: {freightDetail?.sailing_date}
        </Text>
        <Text className="text-xs">
          {t("Route")}: {freightDetail?.route_code}
        </Text>
        <Text className="text-xs">
          {freightDetail?.overTime
            ? t("Deadline") + ": " + freightDetail?.overTime
            : t("Effective Date") + ": " + freightDetail?.startTime}
        </Text>
      </Box>
      <Box className="flex justify-center items-center gap-6">
        <Text className="h-full pt-[40px] text-xl">
          {freightDetail?.start_port}
        </Text>
        <Box className="flex flex-col items-center gap-1">
          <img
            className="w-[50px] object-contain"
            src={`https://www.dadaex.cn/assets/upload/carrierlogo/${freightDetail?.carrier}.png`}
            alt="carrier"
          />
          <img
            className="w-[114px] object-contain"
            src={"/assets/icons/line.png"}
            alt="line"
          />
          <Text>
            {freightDetail?.voyage}天
            {freightDetail?.transport == freightDetail?.end_port ||
            !freightDetail?.end_port ||
            null
              ? "直达"
              : freightDetail?.transport}
          </Text>
        </Box>
        <Text className="h-full pt-[40px] text-xl">
          {freightDetail?.end_port}
        </Text>
      </Box>
    </Box>
  );
};

const InfoPrice: FC<{ freightDetail: any }> = ({ freightDetail }) => {
  return (
    <Box className="flex flex-col px-6 mt-6 bg-white">
      <Box className="flex justify-between mt-2">
        <Text>{freightDetail?.price}</Text>
      </Box>
    </Box>
  );
};

// Freight Page
const FreightDetailPage: FC = () => {
  const { t } = useTranslation();
  const freightIndex = useRecoilValue(freightIndexState);
  const freight = useRecoilValue(freightSeaState);
  console.log("freightIndex", freightIndex);
  console.log("freight", freight);

  return (
    <Page className="flex flex-col overflow-x-hidden custom-scrollbar">
      <Header title={t("Freight Details")} />

      {/* Info General */}
      <InfoGeneral
        freightDetail={{
          ...freight?.data?.[freightIndex || 0],
          surcharge:
            freight?.surcharge?.[freight?.data?.[freightIndex || 0]?.carrier],
          surchargeSpecial:
            freight?.surchargeSpecial?.[
              freight?.data?.[freightIndex || 0]?.carrier
            ],
        }}
      />

      {/* Info Price */}
      <InfoPrice
        freightDetail={{
          surcharge:
            freight?.surcharge?.[freight?.data?.[freightIndex || 0]?.carrier],
          surchargeSpecial:
            freight?.surchargeSpecial?.[
              freight?.data?.[freightIndex || 0]?.carrier
            ],
        }}
      />

      {/* Button */}
      <div className="flex rounded-xl bg-[#000] text-[#E0E3E5] opacity-70 mx-6 h-14 fixed bottom-4 left-0 right-0 z-50">
        <div className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3">
          <span>{t("Add Charges")}</span>
        </div>

        <div className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3">
          <span>{t("Book")}</span>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2 my-3">
          <span>{t("Get Quote")}</span>
        </div>
      </div>
    </Page>
  );
};

export default FreightDetailPage;
