import PriceCollapse from "components/freight/price-collapse";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilValue } from "recoil";
import { freightIndexState, freightSeaState } from "state";
import { Page, Header, Box, Text, Button } from "zmp-ui";
import {
  getMoreQuotesFreightSea,
  getScheduleFreightSea,
} from "services/freight-sea";
import { timeUtil } from "utils/date";

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
  const [schedule, setSchedule] = useState<any>([]);
  const [moreQuotes, setMoreQuotes] = useState<any>({});
  const [moreQuotesTab, setMoreQuotesTab] = useState<number>(0);

  // Handle change tab
  const handleChangeTab = async (tab: string) => {
    if (tab === "costList") {
      setActiveTab(tab);
    } else if (tab === "schedule") {
      const response = await getScheduleFreightSea({
        scid: freightDetail?.carrier_id,
        code: freightDetail?.route_code,
        startPortId: freightDetail?.start_port_id,
        schedule: freightDetail?.schedule,
      });
      setSchedule(
        response?.contact?.map((item: any) => ({
          ...item,
          etd: item?.etd ? item?.etd : item?.tetd,
          endTime: timeUtil(
            item?.etd ? item?.etd : item?.tetd,
            freightDetail?.voyage
          ),
        }))
      );
      setActiveTab(tab);
    } else if (tab === "moreQuotes") {
      const response = await getMoreQuotesFreightSea({
        startPortId: freightDetail?.start_port_id,
        endPortId: freightDetail?.end_port_id,
        transferPortId: freightDetail?.entrepot_id,
        scid: freightDetail?.carrier_id,
        routeId: freightDetail?.routeId,
        sailingDay: freightDetail?.sailing_date,
        firstSupply: freightDetail?.supplier,
      });
      const convertedGroups = {};
      response?.groups?.forEach((group: any[], index: number) => {
        const key = `Week ${index + 1}`;
        convertedGroups[key] = group;
      });
      setMoreQuotes({
        tab: {
          ...convertedGroups,
          ...response?.scheduleGroups,
        },
      });

      setActiveTab(tab);
    }
  };

  // Handle more quotes
  const handleMoreQuotes = (index: number) => {
    setMoreQuotesTab(index);
  };

  return (
    <Box className="flex flex-col px-6 mt-6 bg-white pb-28">
      {/* Tab main */}
      <Box className="w-full flex justify-between mt-6">
        <div
          onClick={async () => await handleChangeTab("costList")}
          className={`rounded-[8px] flex-1 flex justify-center items-center px-2 py-4 h-12 text-base ${
            activeTab === "costList"
              ? "bg-[#4859C0] text-[#fff]"
              : "text-[#19214F]"
          }`}
        >
          {t("Surcharge")}
        </div>
        <div
          onClick={async () => await handleChangeTab("schedule")}
          className={`rounded-[8px] flex-1 flex justify-center items-center px-2 py-4 h-12 text-base ${
            activeTab === "schedule"
              ? "bg-[#4859C0] text-[#fff]"
              : "text-[#19214F]"
          }`}
        >
          {t("Schedule")}
        </div>
        <div
          onClick={async () => await handleChangeTab("moreQuotes")}
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
        <div className="my-6">
          <div className="bg-[#e6e9ff] rounded-[16px] py-6">
            <div className="px-4 flex justify-between text-base text-[#19214f]">
              <div className="flex-[4]">{t("Vessel")}</div>
              <div className="flex-[2]">{t("Voyage")}</div>
              <div className="flex-[6.1]">{t("ETD & ETA")}</div>
            </div>
          </div>

          {/* Danh sách các lịch trình */}
          {schedule?.map((item: any, index: number) => (
            <div key={index} className="py-4 border-b border-[#eee]">
              <div className="flex justify-between text-sm text-[#19214fcc] gap-2 w-full">
                <div className="flex-[4]">{item?.shipName}</div>
                <div className="flex-[1]">{item?.voyage}</div>
                <div className="flex-[6]">
                  {item?.etd}~{item?.endTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "moreQuotes" && (
        <div className="my-6">
          <div className="flex space-x-1 overflow-x-auto custom-scrollbar mr-3">
            {Object.keys(moreQuotes?.tab).map((key: any, index: number) => (
              <div
                key={index}
                onClick={() => handleMoreQuotes(index)}
                className={`min-w-[80px] text-center px-2 pt-1 pb-4 text-base ${
                  moreQuotesTab === index
                    ? "text-[#006af5fa] border-b-2 border-[#006af5fa]"
                    : "text-[#000]"
                }`}
              >
                <Text className="text-base font-bold">{t(key)}</Text>
              </div>
            ))}
          </div>

          {moreQuotes && moreQuotes?.tab &&
            moreQuotes?.tab?.[
              Object?.keys(moreQuotes?.tab)?.[moreQuotesTab]
            ]?.map((quote: any, index: number) => {
              console.log("quote", quote);
              return <div key={index}>"test"</div>;
            })}
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
