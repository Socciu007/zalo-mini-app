import { useVirtualKeyboardVisible } from "hooks";
import React, { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Home",
    icon: <Icon icon="zi-home" />,
    activeIcon: <img src="assets/icons/icon-fargo.png" alt="fargo" />,
  },
  "/chatmsg": {
    label: "Support",
    icon: <img src="assets/icons/icon-supporter1.png" alt="supporter" />,
    activeIcon: <img src="assets/icons/icon-supporter.png" alt="supporter" />,
  },
  "/profile": {
    label: "Me",
    icon: <Icon icon="zi-user" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const { t } = useTranslation();
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={location.pathname}
      onChange={navigate}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => {
        const isRoot = path === "/";
        const isActive = location.pathname === path;
        return (
          <BottomNavigation.Item
            key={path}
            label={isRoot ? (isActive ? "" : t("Home")) : t(tabs[path].label)}
            icon={tabs[path].icon}
            activeIcon={tabs[path].activeIcon}
          />
        );
      })}
    </BottomNavigation>
  );
};
