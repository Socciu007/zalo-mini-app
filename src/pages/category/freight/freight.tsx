import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Box, Header, Page } from "zmp-ui";

// Freight Page
const FreightDetailPage: FC = () => {
  const { t } = useTranslation();
  const { route } = useParams();
  
  return (
    <Page className="flex flex-col">
      <Header title={t(route || "")} />
    </Page>
  );
};

export default FreightDetailPage;
