import PriceCollapse from "components/freight/price-collapse";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { freightIndexState, freightSeaState } from "state";
import { Page, Header, Box, Text, Button } from "zmp-ui";

const InfoGeneral: FC<{ freightDetail: any }> = ({ freightDetail }) => {
  const { t } = useTranslation();
  return (
    <Box className="flex flex-col px-6 pb-6 mt-6 bg-white">
      <Box className="flex justify-between my-2">
        <Text className="text-xs">
          {t("Sailing Date")}: {freightDetail?.sailing_date}
        </Text>
        <Text className="text-xs">
          {t("Route")}: {freightDetail?.route_code}
        </Text>
        <Text className="text-xs">
          {freightDetail?.overTime
            ? t("Deadline") + ": " + freightDetail?.overTime
            : t("Effective Date") + ": " + freightDetail?.startTime}
        </Text>
      </Box>
      <Box className="flex justify-center items-center gap-6">
        <Text className="h-full pt-[42px] text-base">
          {freightDetail?.start_port}
        </Text>
        <Box className="flex flex-col items-center gap-1">
          <img
            className="w-[50px] object-contain"
            src={`https://www.dadaex.cn/assets/upload/carrierlogo/${freightDetail?.carrier}.png`}
            alt="carrier"
          />
          <img
            className="w-[114px] object-contain"
            src={"/assets/icons/line.png"}
            alt="line"
          />
          <Text className="text-[#9d9d9da3]">
            {freightDetail?.voyage}天
            {freightDetail?.transport == freightDetail?.end_port ||
            !freightDetail?.end_port ||
            null
              ? "直达"
              : freightDetail?.transport}
          </Text>
        </Box>
        <Text className="h-full pt-[42px] text-base">
          {freightDetail?.end_port}
        </Text>
      </Box>
    </Box>
  );
};

const InfoPrice: FC<{ freightDetail: any }> = ({ freightDetail }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("costList");
  return (
    <Box className="flex flex-col px-6 mt-6 bg-white pb-28">
      <Box className="w-full flex justify-between mt-6">
        <div
          onClick={() => setActiveTab("costList")}
          className={`rounded-[8px] flex-1 flex justify-center items-center px-2 py-4 h-12 text-base ${
            activeTab === "costList"
              ? "bg-[#4859C0] text-[#fff]"
              : "text-[#19214F]"
          }`}
        >
          {t("Surcharge")}
        </div>
        <div
          onClick={() => setActiveTab("schedule")}
          className={`rounded-[8px] flex-1 flex justify-center items-center px-2 py-4 h-12 text-base ${
            activeTab === "schedule"
              ? "bg-[#4859C0] text-[#fff]"
              : "text-[#19214F]"
          }`}
        >
          {t("Schedule")}
        </div>
        <div
          onClick={() => setActiveTab("moreQuotes")}
          className={`rounded-[8px] flex-1 flex justify-center items-center px-2 py-4 h-12 text-base ${
            activeTab === "moreQuotes"
              ? "bg-[#4859C0] text-[#fff]"
              : "text-[#19214F]"
          }`}
        >
          {t("More Quotes")}
        </div>
      </Box>

      {activeTab === "costList" && (
        <Box className="mt-6">
          <PriceCollapse
            price_20={freightDetail?.price_20}
            price_40={freightDetail?.price_40}
            price_40hq={freightDetail?.price_40hq}
            addNum={() => {}}
            reduceNum={() => {}}
          />

          <Box className="mt-6 text-base flex items-center justify-between bg-[#4859c01a] rounded-[8px] p-4">
            <Text className="text-[#19214F]">{t("Surcharge")}</Text>
            <Text className="text-[#8b261c]">${"23"}</Text>
            <Text className="text-[#8b261c]">￥{"230"}</Text>
          </Box>

          {freightDetail?.surcharge?.map((item: any) => (
            <Box className="mt-6 text-base flex items-start py-2 flex-col border-b border-[#E0E3E5] gap-2">
              <Text className="text-[#19214fcc]">
                {item.SurchargeName}
                {item.SurchargeNameEn ? "(" + item.SurchargeNameEn + ")" : ""}
              </Text>
              {item?.price_20 ||
              item?.price_40 ||
              item?.price_40hq ||
              item?.price_unit ? (
                <Box className="flex px-1 items-center justify-between w-full">
                  {!item?.price_unit ? (
                    <Text className="text-[#19214f99]">
                      {item?.price_20 ? item?.price_20 : 0}/
                      {item?.price_40 ? item?.price_40 : 0}/
                      {item?.price_40hq ? item?.price_40hq : 0}
                    </Text>
                  ) : (
                    <Text className="text-[#19214f99]">
                      {item?.price_unit || 0}
                    </Text>
                  )}
                  <Text className="text-[#19214fcc]">
                    {item?.CurrencyName}:
                    {item?.price_unit
                      ? item?.price_unit
                      : (item?.price_20 || 0) * 1 +
                        (item?.price_40 || 0) * 0 +
                        (item?.price_40hq || 0) * 0}
                  </Text>
                </Box>
              ) : (
                <Box className="flex px-1 items-center justify-between w-full">
                  <Text
                    className={`${
                      item?.remark?.includes("不")
                        ? "text-[#F56C6C]"
                        : "text-[#67C23A]"
                    } font-bold`}
                  >
                    {item?.remark?.includes("不") ? "✗" : "✓"}
                  </Text>
                  <Text className="text-[#19214fcc]">
                    {item?.CurrencyName}:
                    {item?.price_unit
                      ? item?.price_unit
                      : (item?.price_20 || 0) * 1 +
                        (item?.price_40 || 0) * 0 +
                        (item?.price_40hq || 0) * 0}
                  </Text>
                </Box>
              )}
            </Box>
          ))}

          <Box className="mt-6 text-base flex items-start py-2 pb-8 flex-col border-b border-[#E0E3E5] gap-2">
            <Text className="text-[#ca4234] text-base">{t("Remark")}:</Text>
            <Text className="text-[#19214f99] text-base">
              {freightDetail?.remark_en}
              <br />
              {freightDetail?.remark_op}
            </Text>
          </Box>
        </Box>
      )}

      {activeTab === "schedule" && (
        <div className="schedule">
          {/* Tiêu đề bảng */}
          <div
            className="scheduleTit"
            style={{ fontWeight: "bold", padding: "8px 0" }}
          >
            <div className="row" style={{ display: "flex", gap: 16 }}>
              <div style={{ flex: 4 }}>{t("Vessel")}</div>
              <div style={{ flex: 2 }}>{t("Voyage")}</div>
              <div style={{ flex: 6 }}>{t("ETD & ETA")}</div>
            </div>
          </div>

          {/* Danh sách các lịch trình */}
          {/* {dataSource.map((item, index) => (
            <div
              className="scheduleItem"
              key={index}
              style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}
            >
              <div className="row" style={{ display: "flex", gap: 16 }}>
                <div style={{ flex: 4 }}>{item.shipName}</div>
                <div style={{ flex: 2 }}>{item.voyage}</div>
                <div style={{ flex: 6 }}>
                  {item.etd} ~ {item.endTime}
                </div>
              </div>
            </div>
          ))} */}
        </div>
      )}
    </Box>
  );
};

// Freight Page
const FreightDetailPage: FC = () => {
  const { t } = useTranslation();
  const freightIndex = useRecoilValue(freightIndexState);
  const freight = useRecoilValue(freightSeaState);
  console.log("freightIndex", freightIndex);
  console.log("freight", freight);

  return (
    <Page className="flex flex-col overflow-x-hidden custom-scrollbar">
      <Header title={t("Freight Details")} />

      {/* Info General */}
      <InfoGeneral
        freightDetail={{
          ...freight?.data?.[freightIndex || 0],
          surcharge:
            freight?.surcharge?.[freight?.data?.[freightIndex || 0]?.carrier],
          surchargeSpecial:
            freight?.surchargeSpecial?.[
              freight?.data?.[freightIndex || 0]?.carrier
            ],
        }}
      />

      {/* Info Price */}
      <InfoPrice
        freightDetail={{
          ...freight?.data?.[freightIndex || 0],
          surcharge:
            freight?.surcharge?.[freight?.data?.[freightIndex || 0]?.carrier],
          surchargeSpecial:
            freight?.surchargeSpecial?.[
              freight?.data?.[freightIndex || 0]?.carrier
            ],
        }}
      />

      {/* Button */}
      <div className="flex rounded-xl bg-[#000] text-[#E0E3E5] opacity-70 mx-6 h-14 fixed bottom-4 left-0 right-0 z-50">
        <div className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3">
          <span>{t("Add Charges")}</span>
        </div>

        <div className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3">
          <span>{t("Book")}</span>
        </div>

        <div className="flex-1 flex justify-center items-center gap-2 my-3">
          <span>{t("Get Quote")}</span>
        </div>
      </div>
    </Page>
  );
};

export default FreightDetailPage;
