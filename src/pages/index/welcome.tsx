import React, { FC } from "react";
import { Box, Header, Text } from "zmp-ui";
import logo from "static/logo.png";
import appConfig from "../../../app-config.json";
import { getConfig } from "utils/config";
import { getDummyImage } from "utils/product";
import picHeader from "static/header.png";

export const Welcome: FC = () => {
  return (
    <>
      <img
        src="https://www.dadaex.cn/assets/upload/wximg/homePage-1.png"
        className="w-full h-auto object-cover"
        alt="banner"
      />
      <Box className="absolute top-7 left-6 z-10">
        <Text className="text-white text-lg font-bold drop-shadow-md">Fargo</Text>
      </Box>
    </>
  );
};
