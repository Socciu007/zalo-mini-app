import React, { FC } from "react";
import { Route, Routes } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { useHandlePayment } from "hooks";
import HomePage from "pages/index";
import ChatMsgPage from "pages/chatmsg";
import ProfilePage from "pages/profile/index";
import FreightPage from "pages/category/freight/index";
import DestinationPage from "pages/category/freight/destination";
import FreightDetailPage from "pages/category/freight/freight";
if (import.meta.env.DEV) {
  document.body.style.setProperty("--zaui-safe-area-inset-top", "24px");
} else if (getSystemInfo().platform === "android") {
  const statusBarHeight =
    window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  useHandlePayment();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chatmsg" element={<ChatMsgPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/freight" element={<FreightPage />}></Route>
          <Route path="/freight/destination" element={<DestinationPage />}></Route>
          <Route path="/freight/:route" element={<FreightDetailPage />}></Route>
        </Routes>
      </Box>
      <Navigation />
    </Box>
  );
};
