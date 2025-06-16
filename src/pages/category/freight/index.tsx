import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Box, Header, Page, Text, Button, Select, Icon } from "zmp-ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import { ListItem } from "../../../components/list-item";
import { Divider } from "../../../components/divider";
import { useNavigate } from "react-router-dom";

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
            <SwiperSlide key={i} className="px-4 pt-4">
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
  return (
    <Box className="px-10">
      <Box className="border-b border-[#a6a6a930]">
        <Box className="flex items-center px-4">
          <Text className="w-1/3 font-bold">{t("Origin")} :</Text>
          <Box className="flex items-center">
            <Select
              closeOnSelect
              className="border-none ps-2"
              defaultValue="SHANGHAI"
            >
              <Option title="SHANGHAI" value="SHANGHAI" />
              <Option title="SHENZHEN" value="SHENZHEN" />
              <Option title="GUANGZHOU" value="GUANGZHOU" />
              <Option title="BEIJING" value="BEIJING" />
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
          <Text onClick={() => navigate("/freight/destination")}>{t("Please select a port")}</Text>
        </Box>
      </Box>
      <Box className="py-4">
        <Button className="w-full">{t("Search")}</Button>
      </Box>
    </Box>
  );
};

// History Freight
const HistoryFreight: FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Box className="flex items-center px-4 mb-3">
        <Text className="w-1/3">{t("History")}</Text>
      </Box>
      <Box className="flex flex-col gap-4 px-4">
        <ListItem title={"SHANGHAI----SINGAPORE"} onClick={() => {}} />
        <Divider size={1} />
        <ListItem title={"SHANGHAI----HOCHIMINH"} onClick={() => {}} />
        <Divider size={1} />
        <ListItem title={"SHANGHAI----SINGAPORE"} onClick={() => {}} />
        <Divider size={1} />
      </Box>
    </Box>
  );
};

// Freight Page
const FreightPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className="flex flex-col">
      <Header title={t("Freight")} />
      <Banner />
      <Box className="flex flex-col bg-white rounded-lg h-full">
        <SearchFreight />
        <HistoryFreight />
      </Box>
    </Page>
  );
};

export default FreightPage;
