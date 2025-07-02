import React, { FC, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Header, Page } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { freightSeaState } from "state";
import TabsComponent from "components/tabs";

const FreightList: FC = () => {
  const freightSea = useRecoilValue(freightSeaState);
  console.log("freightSea", freightSea);
  // const dateFreight = freightSea?.date?.map((item: any) => ({
  //   label: item?.time,
  //   week: item?.week,
  //   price20gp: item?.["20gp"] || null,
  //   price40gp: item?.["40gp"] || null,
  //   price40hq: item?.["40hq"] || null,
  //   children: <div>FreightList</div>,
  //   activeKey: item?.time,
  // }));
  return <TabsComponent tabsData={freightSea} />;
};

// Freight Page
const FreightDetailPage: FC = () => {
  const { t } = useTranslation();
  const { route } = useParams();

  return (
    <Page className="flex flex-col relative">
      <Header title={t(route || "")} />
      <FreightList />
    </Page>
  );
};

export default FreightDetailPage;
