import React, { FC } from "react";
import { Header, Page } from "zmp-ui";
import { useTranslation } from "react-i18next";

const ExpressPage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className="flex flex-col overflow-x-hidden custom-scrollbar">
      <Header title={t("Check Freight")} />
    </Page>
  );
};

export default ExpressPage; 