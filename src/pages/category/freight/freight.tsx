import React, { FC, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Box, Header, Page } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { freightSeaState } from "state";

const FreightList: FC = () => {
  const freightSea = useRecoilValue(freightSeaState);
  console.log('test', freightSea);
  return <div>FreightList</div>;
};

const FreightFallback: FC = () => {
  return <div>FreightFallback</div>;
};

// Freight Page
const FreightDetailPage: FC = () => {
  const { t } = useTranslation();
  const { route } = useParams();
  // const freightSea = useRecoilValue(freightSeaState);
  // console.log(freightSea);
  return (
    <Page className="flex flex-col">
      <Header title={t(route || "")} />
      <FreightList />
    </Page>
  );
};

export default FreightDetailPage;
