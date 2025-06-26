import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Booking } from "types/fargo/booking";
import { Box, Text, useNavigate } from "zmp-ui";
import * as freightSeaService from "services/freight-sea";
import { useSetRecoilState } from "recoil";
import { freightSeaState } from "state";

export const BookingItem: FC<{ data: Booking }> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setFreightSea = useSetRecoilState(freightSeaState);

  // Handle Click freight sea list
  const handleClickBooking = async (origin: string, destination: string) => {
    const res = await freightSeaService.getFreightSea(origin, destination);
    console.log("res", res);
    if (res?.code === 0 || res?.dateResult) {
      setFreightSea({
        data: res?.data || res?.seaResult,
        date: res?.date || res?.dateResult,
      });
      navigate(`/freight/${encodeURIComponent(`${origin}-${destination}`)}`);
    }
  };

  return (
    <Box key={data.id}>
      <Box
        className="bg-white rounded-md"
        onClick={() =>
          handleClickBooking(
            data?.["startPort.nameEn"],
            data?.["endPort.nameEn"]
          )
        }
      >
        {/* Line 1: Origin -> Destination */}
        <Box className="flex p-4 items-center justify-between text-center border-b border-[#a6a6a930] pb-5">
          <Box className="flex-1">
            <Text className="text-sm font-semibold text-[#2b2b2b] mb-2 text-start">
              {data?.["startPort.nameEn"]}
            </Text>
            <Text className="text-xs text-gray-500 text-start">
              {data?.["startPort.name"]}
            </Text>
          </Box>

          <img src="assets/icons/icon-boat.png" />

          <Box className="flex-1">
            <Text className="text-sm font-semibold text-[#2b2b2b] mb-2 text-end">
              {data?.["endPort.nameEn"]}
            </Text>
            <Text className="text-xs text-gray-500 text-end">
              {data?.["endPort.name"]}
            </Text>
          </Box>
        </Box>

        {/* Line 2: Departure date and Price */}
        <Box className="flex justify-between items-center py-3 px-4 text-sm">
          <Text className="text-gray-500">
            <span className="text-[#2b2b2b]">
              {t("ETD")}: {data?.sailing_day}
            </span>
          </Text>
          <Text className="text-[#AD4500]">
            ${data?.["20gpSell"]}/${data?.["40gpSell"]}/${data?.["40hqSell"]}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
