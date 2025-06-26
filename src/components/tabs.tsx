import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Text } from "zmp-ui";

interface ITabsProps {
  label?: any;
  week?: any;
  price20gp?: any;
  price40gp?: any;
  price40hq?: any;
  children?: any;
  activeKey: number;
}

const TabsComponent: FC<{ tabsData: ITabsProps[] }> = ({ tabsData = [] }) => {
  const [activeKey, setActiveKey] = useState(0);
  const [checkShow, setCheckShow] = useState(false);
  const { t } = useTranslation();

  const label = (label: string, week: string, price: string) => {
    return (
      <Box className="text-center h-full">
        <Text className="font-bold">{label}</Text>
        <Text className="font-bold">{t(week)}</Text>
        {price && <Text className="font-bold">${price}</Text>}
      </Box>
    );
  };
  return (
    <Box className="relative flex flex-col flex-1 overflow-hidden">
      {/* Tabs Header */}
      <div className="sticky top-0 z-10 flex items-center px-4 bg-white">
        {/* Tabs */}
        <div className="flex space-x-1 overflow-x-auto custom-scrollbar mr-3">
          {tabsData.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveKey(tab.activeKey)}
              className={`min-w-[60px] px-1 py-1 text-sm ${
                activeKey === tab.activeKey || activeKey === index
                  ? "text-red-600"
                  : "text-#000"
              }`}
            >
              {label(tab?.label, tab?.week, tab?.price20gp?.price)}
            </button>
          ))}
        </div>
        {/* Calendar Button */}
        <div
          onClick={() => {}}
          className="flex py-1 gap-1 flex-col items-center justify-center w-60 cursor-pointer border-s ps-2 border-[#f4f5f6]"
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
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 mt-2 mb-14">
        {tabsData?.map((tab, index) => {
          return (
            <>
              {(activeKey === tab.activeKey || activeKey === index) && (
                <div key={index} className="bg-white px-4 py-2 my-3 rounded-md">
                  <div className="grid grid-cols-12 justify-end items-center my-2">
                    <div className="col-span-2">
                      <div className="shipLogo">
                        <img
                          src={`https://www.dadaex.cn/assets/upload/carrierlogo/${tab}.png`}
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
                            {tab?.price20gp?.price < 88888 ? (
                              "$888"
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
                            {tab?.price40gp?.price < 88888 ? (
                              <div className="text-end">$888</div>
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
                            {tab?.price40hq?.price < 88888 ? (
                              "$888"
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
            </>
          );
        })}
      </div>

      <div className="flex rounded-xl bg-[#000] text-[#E0E3E5] opacity-70 mx-6 h-14 fixed bottom-14 left-0 right-0 z-50">
        {/* 筛选按钮 */}
        <div
          className="flex-1 flex justify-center items-center border-r border-white gap-2 my-3"
          onClick={() => {}}
        >
          <img
            src="/assets/icons/icon-filter.png"
            alt="filter"
            className="w-5 h-5 mb-1"
          />
          <span>筛选</span>
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
            <span>数据导出</span>
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
            <span>取消导出</span>
          </div>
        )}
      </div>
    </Box>
  );
};

export default TabsComponent;
