import React, { FC } from "react";
import { Route, Routes, useLocation } from "react-router";
import { Box } from "zmp-ui";
import { Navigation } from "./navigation";
import { getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
// import { useHandlePayment } from "hooks";
import HomePage from "pages/index";
import ChatMsgPage from "pages/chatmsg";
import ProfilePage from "pages/profile/index";
import FreightPage from "pages/category/freight/index";
import DestinationPage from "pages/category/freight/destination";
import FreightDetailPage from "pages/category/freight/freight";
import EditProfile from "pages/profile/edit";
import AuthLoginPage from "pages/login";
import LoginPage from "pages/login/login";
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
  const location = useLocation();

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthLoginPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/chatmsg" element={<ChatMsgPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/freight" element={<FreightPage />} />
          <Route path="/freight/destination" element={<DestinationPage />} />
          <Route path="/freight/:route" element={<FreightDetailPage />} />
        </Routes>
      </Box>
      {!location.pathname.includes("/freight/") && <Navigation />}
    </Box>
  );
};
