import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValueLoadable } from "recoil";
import { userInfoState } from "@/state";
import { Page, Header, Box, Input, Button } from "zmp-ui";

const EditProfile: FC = () => {
  const { t } = useTranslation();
  const [editStatus, setEditStatus] = useState("Modify");
  const userInfo = useRecoilValueLoadable(userInfoState);
  const [userInfoData, setUserInfoData] = useState({
    username: userInfo?.contents?.username,
    company: userInfo?.contents?.company,
    address: userInfo?.contents?.address,
    wechat: userInfo?.contents?.wechat,
    phone: userInfo?.contents?.phone,
    qq: userInfo?.contents?.qq,
    email: userInfo?.contents?.email,
  });

  // Handle edit profile
  const handleEditProfile = () => {
    if (editStatus === "Modify") {
      setEditStatus("Submit");
    } else {
      setEditStatus("Modify");
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfoData({ ...userInfoData, [name]: value });
  };

  return (
    <Page
      className="flex flex-col relative"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Header title={t("Edit Profile")} />

      {/* Information */}
      <Box className="flex-1 overflow-y-auto custom-scrollbar">
        <Box className="flex items-center justify-between py-10 px-6 flex-col gap-4">
          <Input
            value={userInfoData?.username}
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder="请输入"
            label={t("Username")}
            name="username"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder={t("Please enter")}
            label={t("Company")}
            name="company"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder={t("Please enter")}
            label={t("Address")}
            name="address"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder={t("Please enter")}
            label={t("Wechat")}
            name="wechat"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder="请输入"
            label={t("Phone")}
            value={userInfoData?.phone}
            name="phone"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder="请输入"
            label={t("QQ")}
            value={userInfoData?.qq}
            name="qq"
            onChange={handleInputChange}
          />
          <Input
            disabled={editStatus === "Modify"}
            clearable
            required={true}
            className="w-full text-xl flex-1 custom-input border-b-[3px] border-[#D3D6DA]"
            placeholder="请输入"
            label={t("Email")}
            value={userInfoData?.email}
            name="email"
            onChange={handleInputChange}
          />
          <Button className="w-full mt-10" onClick={handleEditProfile}>
            {t(editStatus)}
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default EditProfile;
