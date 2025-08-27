import React, { FC, useEffect, useState } from "react";
import { Box, Icon, Page, Text, Button, useNavigate, Modal } from "zmp-ui";
import { ListRenderer } from "@/components/list-renderer";
import { useToBeImplemented } from "@/hooks";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/locale";
import { triggerLoginState, userAuthState } from "@/state";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { IUserAuth } from "@/types/fargo/userAuth";
import zmp from "zmp-sdk";

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
  const onClick = useToBeImplemented({
    type: "success",
    text: "Chức năng dành cho các bên tích hợp phát triển...",
  });

  return (
    <Box className="m-6 mt-2">
      <ListRenderer
        title={t("My Orders")}
        onClick={onClick}
        isMore={true}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-tag.png"
                alt="tag"
              />
            ),
            title: "New Order",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-contact.png"
                alt="contact"
              />
            ),
            title: "Approved",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list1.png"
                alt="list1"
              />
            ),
            title: "Booking",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list2.png"
                alt="list2"
              />
            ),
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
  const navigate = useNavigate();
  const [isShowModalCompany, setIsShowModalCompany] = useState(false);

  const userAuth = useRecoilValueLoadable(userAuthState);
  console.log("userAuth", userAuth?.contents?.user?.isAdmin);

  // Handle click item 
  const handleClick = (typeClick: string) => {
    if (typeClick === "Manage" || typeClick === "Join" || typeClick === "Invite") {
      if (userAuth?.contents?.user?.isAdmin) {
        navigate("/profile/verify");
      } else {
        setIsShowModalCompany(true);
      }
    }
  };

  //Handle login when user is not login
  const handleLogin = () => {
    if (userAuth?.contents) {
      setIsShowModalCompany(false);
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <Box className="m-6">
      <ListRenderer
        title={t("Enterprise Management")}
        onClick={(item) => handleClick(item?.title)}
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

      {/* Modal logout when user is not login */}
      <Modal
        visible={isShowModalCompany}
        onClose={() => setIsShowModalCompany(false)}
        description={t("Please log in first!")}
        modalClassName="shadow-[0px_10px_24px_rgba(20,20,21,0.09)] z-50 opacity-100 modal-login"
        actions={[
          {
            text: (
              <Button
                className="bg-[#E0E3E5] text-[#2E2E2E] rounded-[6px] justify-center"
                variant="secondary"
                onClick={() => setIsShowModalCompany(false)}
              >
                {t("Cancel")}
              </Button>
            ),
          },
          {
            text: (
              <Button
                className="bg-[#3EBB6C] text-white rounded-[6px] justify-center"
                variant="secondary"
                onClick={handleLogin}
              >
                {t("Login")}
              </Button>
            ),
          },
        ]}
      />
    </Box>
  );
};

// 个人支付
const PersonalPay: FC = () => {
  const { t } = useTranslation();
  const onClick = useToBeImplemented({
    type: "success",
    text: "Chức năng dành cho các bên tích hợp phát triển...",
  });

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
const Other: FC<{ userAuth: IUserAuth | null }> = ({ userAuth }) => {
  const { t } = useTranslation();
  const setTriggerLogin = useSetRecoilState(triggerLoginState);
  const navigate = useNavigate();
  const [isShowModalLogout, setIsShowModalLogout] = useState(false);

  const handleClick = (typeClick: string) => {
    if (typeClick === "Logout") {
      if (userAuth) {
        zmp.removeStorage({ keys: ["Authorization"] });
        setTriggerLogin((prev) => prev - 1);
      } else {
        setIsShowModalLogout(true);
      }
    }
  };

  return (
    <Box className="m-6">
      <ListRenderer
        title={t("Other")}
        onClick={(item) => handleClick(item.title)}
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

      {/* Modal logout when user is not login */}
      <Modal
        visible={isShowModalLogout}
        onClose={() => setIsShowModalLogout(false)}
        description={t("Please log in first!")}
        modalClassName="shadow-[0px_10px_24px_rgba(20,20,21,0.09)] z-50 opacity-100 modal-login"
        actions={[
          {
            text: (
              <Button
                className="bg-[#E0E3E5] text-[#2E2E2E] rounded-[6px] justify-center"
                variant="secondary"
                onClick={() => setIsShowModalLogout(false)}
              >
                {t("Cancel")}
              </Button>
            ),
          },
          {
            text: (
              <Button
                className="bg-[#3EBB6C] text-white rounded-[6px] justify-center"
                variant="secondary"
                onClick={() => navigate("/auth/login")}
              >
                {t("Login")}
              </Button>
            ),
          },
        ]}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userAuth = useRecoilValueLoadable(userAuthState);

  return (
    <Page
      className="relative flex-1 flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <HeaderProfile />
      {/* Profile List */}
      <Box className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Avatar Header */}
        <Box className="h-20 bg-[#E6ECFF] shadow-md shadow-[#f4f5f6]">
          <Box className="flex items-end justify-between border-t border-[#fff] px-6">
            <Box className="flex items-end space-x-2">
              <Box className="w-16 h-16 rounded-full bg-[#f4f5f6] flex items-center justify-center">
                <Icon icon="zi-user" className="text-black text-4xl" />
              </Box>
              {userAuth?.contents ? (
                <Box className="flex flex-col items-start">
                  <Text className="text-black text-xl font-bold">
                    {userAuth?.contents?.user?.username}
                  </Text>
                  <Text className="text-[#A9ADB2] text-[10px]">
                    {userAuth?.contents?.user?.cName}
                  </Text>
                </Box>
              ) : (
                <Text
                  onClick={() => navigate("/auth")}
                  className="text-black text-xl font-bold drop-shadow-md leading-loose"
                >
                  {t("Click to login")}
                </Text>
              )}
            </Box>
            <Button
              onClick={() => navigate("/profile/edit")}
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
        <Other userAuth={userAuth?.contents} />
      </Box>
    </Page>
  );
};

export default ProfilePage;
