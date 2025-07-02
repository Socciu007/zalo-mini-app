import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Page, Header } from "zmp-ui";

const EditProfile: FC = () => {
  const { t } = useTranslation();
  return (
    <Page
      className="flex flex-col relative"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Header title={t("Edit Profile")} />
    </Page>
  );;
};

export default EditProfile; 