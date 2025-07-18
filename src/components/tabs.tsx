import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Calendar, Icon, Sheet, Text, Button } from "zmp-ui";

interface ITabsProps {
  // label?: any;
  // week?: any;
  // price20gp?: any;
  // price40gp?: any;
  // price40hq?: any;
  // children?: any;
  // activeKey: number;
  data: any[];
  date: any[];
}

const TabsComponent: FC<{ tabsData: ITabsProps }> = ({ tabsData }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [checkShow, setCheckShow] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [isCalendar, setIsCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { t } = useTranslation();
  console.log("tabsData", tabsData);

  const label = (label: string, week: string, price: string) => {
    return (
      <Box className="text-center h-full">
        <Text className="font-bold">{label}</Text>
        <Text className="font-bold">{t(week)}</Text>
        {price && <Text className="font-bold">${price}</Text>}
      </Box>
    );
  };

  // Handle date change
  const handleDateChange = (date: Date) => {
    console.log("date", date);
    setSelectedDate(date);
  };

  return (
    <Box className="relative flex flex-col flex-1 overflow-hidden">
      {/* Tabs Header */}
      <div className="sticky top-0 z-10 flex items-center px-4 bg-white">
        {/* Tabs */}
        <div className="flex space-x-1 overflow-x-auto custom-scrollbar mr-3">
          {!!tabsData?.date?.length &&
            tabsData?.date?.map((tab: any, index: number) => (
              <button
                key={index}
                onClick={() => setActiveKey(tab?.time)}
                className={`min-w-[60px] px-1 py-1 text-sm ${
                  activeKey === tab?.time || activeKey === index
                    ? "text-red-600"
                    : "text-#000"
                }`}
              >
                {label(tab?.time, tab?.week, tab?.["20gp"]?.price)}
              </button>
            ))}
        </div>
        {/* Calendar Button */}
        <div
          onClick={() => setIsCalendar(true)}
          className="flex py-1 gap-1 flex-col items-center justify-center w-60 cursor-pointer border-s ps-2 border-[#A9ADB2]"
        >
          <img
            src="/assets/icons/icon-calendar.png"
            alt="calendar"
            className="w-5 h-5"
          />
          <span className="text-sm text-gray-700">{t("Calendar")}</span>
          <img src="/assets/icons/icon-rl3.png" alt="rl3" className="w-3 h-2" />
        </div>
      </div>
      {/* Tabs Content */}
      <div className={`flex-1 overflow-y-auto custom-scrollbar px-6 mt-2 mb-14 ${isCalendar ? "opacity-100" : ""}`}>
        {tabsData?.date?.map((tab, index) => {
          return (
            <div key={index}>
              {(activeKey === tab?.time || activeKey === index) && (
                <div key={index} className="bg-white px-4 py-2 my-3 rounded-md">
                  <div className="grid grid-cols-12 justify-end items-center my-2">
                    <div className="col-span-2">
                      <div className="shipLogo">
                        <img
                          className="w-[86px] h-[70px] object-contain"
                          src={`https://www.dadaex.cn/assets/upload/carrierlogo/${tab?.["20gp"]?.carrier}.png`}
                          alt="carrier"
                        />
                      </div>
                    </div>

                    <div className="col-span-10">
                      <div className="grid grid-cols-12 justify-end items-center">
                        <div
                          className={`${
                            checkShow ? "col-span-3" : "col-span-4"
                          }`}
                        >
                          <div className="text-end">
                            {tab?.["20gp"]?.price ? (
                              <div className="text-end">
                                ${tab?.["20gp"]?.price}
                              </div>
                            ) : (
                              <span className="text-end">
                                <img
                                  src="http://www.dadaex.cn/assets/upload/wximg/ting.png"
                                  alt="pause"
                                  style={{ width: "35px", height: "35px" }}
                                  className="inline-block"
                                />
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className={`${
                            checkShow ? "col-span-3" : "col-span-4"
                          }`}
                        >
                          <div className="text-end">
                            {tab?.["40gp"]?.price ? (
                              <div className="text-end">
                                ${tab?.["40gp"]?.price}
                              </div>
                            ) : (
                              <span className="text-end">
                                <img
                                  src="http://www.dadaex.cn/assets/upload/wximg/ting.png"
                                  alt="pause"
                                  style={{ width: "35px", height: "35px" }}
                                  className="inline-block"
                                />
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          className={`${
                            checkShow ? "col-span-3" : "col-span-4"
                          }`}
                        >
                          <div className="text-end">
                            {tab?.["40hq"]?.price ? (
                              <div className="text-end">
                                ${tab?.["40hq"]?.price}
                              </div>
                            ) : (
                              <span className="text-end">
                                <img
                                  src="http://www.dadaex.cn/assets/upload/wximg/ting.png"
                                  alt="pause"
                                  style={{ width: "35px", height: "35px" }}
                                  className="inline-block"
                                />
                              </span>
                            )}
                          </div>
                        </div>

                        {checkShow && (
                          <div className="col-span-3 text-end">
                            <img
                              src={
                                true
                                  ? "/assets/icons/icon-checked.png"
                                  : "/assets/icons/icon-check.png"
                              }
                              alt="check"
                              className="w-5 h-5 inline-block"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 gap-y-1 justify-end items-center">
                    <div
                      className={`${checkShow ? "col-span-6" : "col-span-8"}`}
                    >
                      <div className="text-truncate">
                        <span>
                          {tab?.price20gp?.days === 1
                            ? `起运港码头:SHANGHAI`
                            : `起运港:SHANGHAI`}
                        </span>
                      </div>
                    </div>

                    <div className={"col-span-4"}>
                      <div className="text-end">
                        <span>航线: JB</span>
                      </div>
                    </div>

                    <div
                      className={`${checkShow ? "col-span-6" : "col-span-8"}`}
                    >
                      <div className="ortherLeft pt-2 text-truncate">
                        <span>
                          {tab?.price20gp?.days === 1
                            ? `目的港码头:SINGAPORE`
                            : `目的港:SINGAPORE`}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-4">
                      <div className="text-end">
                        <span className="text-[#ca4234] bg-[#FFDBDB] px-1 py-0.5 rounded-t">
                          {tab?.price20gp?.days}天
                          {tab?.price20gp?.days === 1 ? "直达" : "中转"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex rounded-xl bg-[#000] text-[#E0E3E5] opacity-70 mx-6 h-14 fixed bottom-4 left-0 right-0 z-50">
        {/* 筛选按钮 */}
        <div
          className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3"
          onClick={() => setIsFilter(true)}
        >
          <img
            src="/assets/icons/icon-filter.png"
            alt="filter"
            className="w-5 h-5 mb-1"
          />
          <span>{t("Filter")}</span>
        </div>

        {/* 导出数据 */}
        {!checkShow ? (
          <div
            className="flex-1 flex justify-center items-center gap-2 my-3"
            onClick={() => setCheckShow(true)}
          >
            <img
              src="/assets/icons/icon-export.png"
              alt="export"
              className="w-5 h-5 mb-1"
            />
            <span>{t("Export")}</span>
          </div>
        ) : (
          <div
            className="flex-1 flex justify-center items-center gap-2 my-3"
            onClick={() => setCheckShow(false)}
          >
            <img
              src="/assets/icons/icon-export.png"
              alt="cancel-export"
              className="w-5 h-5 mb-1 opacity-70"
            />
            <span>{t("Cancel Export")}</span>
          </div>
        )}
      </div>

      {/* Filter */}
      <Sheet visible={isFilter}>
        <Box className="px-6 pt-4">
          {/* 条件筛选 */}
          <div class="mb-6">
            <div class="flex justify-between items-center mb-2">
              <span class="text-2xl font-bold">{t("Conditions")}</span>
              <button
                onclick="clearSection('condition')"
                class="text-[#002B6B] text-xl"
              >
                {t("Clear")}
              </button>
            </div>
            <div id="condition" class="flex gap-4">
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                {t("Fastest")}
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                {t("Direct")}
              </button>
            </div>
          </div>

          {/* 船公司筛选 */}
          <div class="mb-10">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-2xl">{t("Carrier")}</span>
              <button
                onclick="clearSection('company')"
                class="text-[#002B6B] text-xl"
              >
                {t("Clear")}
              </button>
            </div>
            <div id="company" class="grid grid-cols-3 gap-y-5 gap-x-3">
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                MSC
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                RCL
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                SITC
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                IAL
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                ONE
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                YML
              </button>
              <button class="bg-[#EBEDEF] text-xl px-8 py-4 rounded-md text-[#180C31]">
                KMTC
              </button>
            </div>
          </div>

          {/* 按钮 */}
          <div class="flex justify-between mb-6">
            <button
              onClick={() => setIsFilter(false)}
              class="w-1/2 mr-2 py-3 rounded-3xl bg-[#DBEBFF] text-[#180C31] text-xl"
            >
              {t("Reset")}
            </button>
            <button
              onClick={() => setIsFilter(false)}
              class="w-1/2 ml-2 py-3 rounded-3xl bg-[#00378A] text-white text-xl"
            >
              {t("Confirm")}
            </button>
          </div>
        </Box>
      </Sheet>

      {/* Calendar */}
      {isCalendar && (
        <Box className="fixed bottom-0 left-0 right-0 z-50 bg-white py-5 px-2 text-xl rounded-t-2xl">
          <Calendar
            locale={t("en")}
            className=""
            headerRender={(title) => {
              return (
                <Box className="relative">
                  <Text className="text-2xl flex-1 text-center">
                    {t("Select Date")}
                  </Text>
                  <Box
                    onClick={() => setIsCalendar(false)}
                    className="absolute right-4 top-1"
                  >
                    <Icon icon="zi-close" className="w-5 h-5" />
                  </Box>
                  <Text className="text-xl font-bold text-center py-2">
                    {title}
                  </Text>
                </Box>
              );
            }}
            onSelect={handleDateChange}
            value={selectedDate}
          />
          <Box className="flex flex-col justify-between mt-6">
            <Text className="text-xl text-center py-2">{selectedDate?.toLocaleDateString()?.split('/')?.join('-')}</Text>
            <Button className="text-2xl py-2 w-full">{t("Confirm")}</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default TabsComponent;
