// @ts-nocheck
import origin from "../../../../mock/fargo/origin.json";
import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { Box, Header, Page, Text, Button, Select, Icon } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { ListItem } from "../../../components/list-item";
import { Divider } from "../../../components/divider";
import { useNavigate } from "react-router-dom";
import {
  selectedDestinationState,
  selectedOriginState,
  freightSeaState,
  historySearchFreightState,
} from "state";
import { useToBeImplemented } from "hooks";
import { debounce } from "lodash";
import * as freightSeaService from "services/freight-sea";

export const Banner: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {[1, 2, 3].map((slide, i) => {
          return (
            <SwiperSlide className="px-4 pt-4" key={i}>
              <Box
                className="w-full rounded-lg aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{
                  backgroundImage: `url(https://www.dadaex.cn/assets/upload/wximg/banner${slide}.png)`,
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

// Search Freight
const SearchFreight: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const selectedDestination = useRecoilValue(selectedDestinationState);
  const [freightSea, setFreightSea] = useRecoilState(freightSeaState);
  const [selectedOrigin, setSelectedOrigin] =
    useRecoilState(selectedOriginState);
  const setHistorySearchFreight = useSetRecoilState(historySearchFreightState);
  const notifyWarning = useToBeImplemented({
    type: "warning",
    text: t("Please select origin or destination"),
  });
  const notifyError = useToBeImplemented({
    type: "error",
    text: t("Freight not found"),
  });

  // Handle Click Search Freight
  const handleClickSearch = useCallback(async () => {
    if (!selectedDestination || !selectedOrigin) {
      notifyWarning();
      return;
    }

    // Save history search freight
    const newSearch = {
      origin: selectedOrigin,
      destination: selectedDestination,
      timestamp: new Date().toISOString(),
    };
    setHistorySearchFreight((prev) => {
      const updated = [
        newSearch,
        ...prev.filter(
          (item) =>
            item.origin !== selectedOrigin ||
            item.destination !== selectedDestination
        ),
      ];
      const limited = updated.slice(0, 10);
      localStorage.setItem("freightSearchHistory", JSON.stringify(limited));
      return limited;
    });

    // Get freight sea
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const res = await freightSeaService.getFreightSea(
      selectedOrigin,
      selectedDestination,
      date.toISOString().split("T")[0]
    );
    if (res?.code === 0 || res?.dateResult) {
      setFreightSea({
        data: res?.data || res?.seaResult,
        date: res?.date || res?.dateResult,
        surcharge: res?.surcharge,
        surchargeSpecial: res?.surchargeSpecial,
        carrier: res?.carrier,
      });
      navigate(
        `/freight/${encodeURIComponent(
          `${selectedOrigin}-${selectedDestination}`
        )}`
      );
    } else {
      notifyError();
    }
    return;
  }, [selectedDestination, selectedOrigin]);

  return (
    <Box className="px-10">
      <Box className="border-b border-[#a6a6a930]">
        <Box className="flex items-center px-4">
          <Text className="w-1/3 font-bold">{t("Origin")} :</Text>
          <Box className="flex items-center">
            <Select
              closeOnSelect
              className="border-none ps-1 select-origin"
              defaultValue="SHANGHAI"
              onChange={(val) => setSelectedOrigin(val)}
            >
              {origin?.map((item) => (
                <option
                  title={item?.label}
                  value={item?.value}
                  key={item?.value}
                />
              ))}
            </Select>
            <Icon
              icon="zi-location-solid"
              className="text-[#000] text-lg leading-none"
            />
          </Box>
        </Box>
      </Box>
      <Box className="border-b border-[#a6a6a930] py-4">
        <Box className="flex items-center px-4">
          <Text className="w-1/3 font-bold">{t("Destination")} :</Text>
          <Text
            className="ps-0.5"
            onClick={() => navigate("/freight/destination")}
          >
            {selectedDestination || t("Please select a port")}
          </Text>
        </Box>
      </Box>
      <Box className="py-4">
        <Button className="w-full" onClick={handleClickSearch}>
          {t("Search")}
        </Button>
      </Box>
    </Box>
  );
};

// History Freight
const HistoryFreight: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [freightSea, setFreightSea] = useRecoilState(freightSeaState);
  const historySearchFreight = useRecoilValue(historySearchFreightState);
  const notifyWarning = useToBeImplemented({
    type: "warning",
    text: t("Please select origin or destination"),
  });
  const notifyError = useToBeImplemented({
    type: "error",
    text: t("Freight not found"),
  });

  // Handle Click History Freight
  const handleClickHistory = useCallback(
    debounce(async (history: string) => {
      const [origin, destination] = history.split("-");
      if (!origin || !destination) {
        notifyWarning();
        return;
      }
      const date = new Date();
      date.setDate(date.getDate() + 3);
      const res = await freightSeaService.getFreightSea(origin, destination, date.toISOString().split("T")[0]);
      if (res?.code === 0 || res?.dateResult) {
        setFreightSea({
          data: res?.data || null,
          date: res?.date || res?.dateResult,
          surcharge: res?.surcharge,
          surchargeSpecial: res?.surchargeSpecial,
          carrier: res?.carrier,
        });
        navigate(`/freight/${encodeURIComponent(history)}`);
      } else {
        notifyError();
      }
    }, 100),
    []
  );
  return (
    <Box>
      <Box className="flex items-center px-4 mb-3">
        <Text className="w-1/3">{t("History")}</Text>
      </Box>
      <Box className="flex flex-col gap-4 px-4">
        {historySearchFreight?.map((item) => (
          <div key={`${item.origin}----${item.destination}`}>
            <ListItem
              title={`${item.origin}----${item.destination}`}
              icon={"assets/icons/icon-boat2.png"}
              onClick={() => handleClickHistory(`${item.origin}-${item.destination}`)}
            />
            <Divider size={1} />
          </div>
        ))}
      </Box>
    </Box>
  );
};

// Freight Page
const SearchFreightPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className="flex flex-col overflow-x-hidden custom-scrollbar">
      <Header title={t("Freight")} />
      <Banner />
      <Box className="flex flex-col bg-white rounded-lg h-full">
        <SearchFreight />
        <HistoryFreight />
      </Box>
    </Page>
  );
};

export default SearchFreightPage;
