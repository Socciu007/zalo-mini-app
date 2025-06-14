import React, { FC } from "react";
import { Box, Icon, Page, Text, Button } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "components/locale";

const HeaderProfile: FC = () => {
  return (
    <Box className="relative h-20">
      <Box
        className="absolute top-0 left-0 w-full h-20 z-0"
        style={{
          background: "linear-gradient(to bottom, #A8B4FF 0%, #E6ECFF 100%)",
        }}
      />
      <Box className="absolute top-10 left-5 w-full">
        <LanguageSwitcher />
      </Box>
    </Box>
  );
};

// 个人信息
const Personal: FC = () => {
  const { t } = useTranslation();
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6 mt-2">
      <ListRenderer
        title={t("My Orders")}
        onClick={onClick}
        isMore={true}
        items={[
          {
            icon: <img className="w-12 h-12" src="/assets/icons/icon-tag.png" alt="tag" />,
            title: "New Order",
          },
          {
            icon: <img className="w-12 h-12" src="/assets/icons/icon-contact.png" alt="contact" />,
            title: "Approved",
          },
          {
            icon: <img className="w-12 h-12" src="assets/icons/icon-list1.png" alt="list1" />,
            title: "Booking",
          },
          {
            icon: <img className="w-12 h-12" src="assets/icons/icon-list2.png" alt="list2" />,
            title: "Pre-shipment",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => t(item.title)}
      />
    </Box>
  );
};

// 企业管理
const Company: FC = () => {
  const { t } = useTranslation();
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title={t("Enterprise Management")}
        onClick={onClick}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-seal.png"
                alt="seal"
              />
            ),
            title: "Verify",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-building.png"
                alt="building"
              />
            ),
            title: "Manage",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-hospital.png"
                alt="hospital"
              />
            ),
            title: "Join",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-group.png"
                alt="group"
              />
            ),
            title: "Invite",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => t(item.title)}
      />
    </Box>
  );
};

// 个人支付
const PersonalPay: FC = () => {
  const { t } = useTranslation();
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title={t("My Orders")}
        onClick={onClick}
        isMore={true}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-card.png"
                alt="card"
              />
            ),
            title: "Amount",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-loading.png"
                alt="loading"
              />
            ),
            title: "Credit",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list3.png"
                alt="list3"
              />
            ),
            title: "Unbilled",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-completed.png"
                alt="completed"
              />
            ),
            title: "Billed",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => t(item.title)}
      />
    </Box>
  );
};

// 其他功能
const Other: FC = () => {
  const { t } = useTranslation();
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title={t("Other")}
        onClick={onClick}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-news.png"
                alt="news"
              />
            ),
            title: "Template",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-wallet.png"
                alt="wallet"
              />
            ),
            title: "Collection",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list4.png"
                alt="list4"
              />
            ),
            title: "Contract",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-setting.png"
                alt="setting"
              />
            ),
            title: "Register",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-message.png"
                alt="message"
              />
            ),
            title: "Wechat Push",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-write.png"
                alt="write"
              />
            ),
            title: "Change Password",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-logout.png"
                alt="logout"
              />
            ),
            title: "Logout",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => t(item.title)}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page
      className="relative flex-1 flex flex-col"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <HeaderProfile />
      {/* Profile List */}
      <Box className="flex-1 overflow-auto">
        {/* Avatar Header */}
        <Box className="h-20 bg-[#E6ECFF] shadow-md shadow-[#f4f5f6]">
          <Box className="flex items-end justify-between border-t border-[#fff] px-6">
            <Box className="flex items-end space-x-2">
              <Box className="w-16 h-16 rounded-full bg-[#f4f5f6] flex items-center justify-center">
                <Icon icon="zi-user" className="text-black text-4xl" />
              </Box>
              <Text className="text-black text-xl font-bold drop-shadow-md leading-loose">
                {t("Login")}
              </Text>
            </Box>
            <Button
              variant="secondary"
              className="text-[#0019FF] text-lg bg-white bg-opacity-30 py-2 px-0 h-fit w-fit"
            >
              {t("Profile")}
            </Button>
          </Box>
        </Box>
        <Personal />
        <Company />
        <PersonalPay />
        <Other />
      </Box>
    </Page>
  );
};

export default ProfilePage;
