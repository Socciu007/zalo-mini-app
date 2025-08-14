import React, { useState } from "react";
import Icon from "zmp-ui/icon";

const PriceCollapse = ({
  price_20 = 1,
  price_40 = 0,
  price_40hq = 0,
  addNum,
  reduceNum,
}: {
  price_20: number;
  price_40: number;
  price_40hq: number;
  addNum: (key: string) => void;
  reduceNum: (key: string) => void;
}) => {
  const [isCollapse, setIsCollapse] = useState(false);
  return (
    <div className="bg-[#fff]">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[#303761] text-xl flex items-center">
          <span className="inline-block w-[45px] h-full text-center rounded-[16px] bg-[#4859c01a]">
            {price_20}
          </span>
          <span style={{ margin: "0 5px" }}>20GP</span>
          <span className="inline-block w-[45px] h-full text-center rounded-[16px] bg-[#4859c01a]">
            {price_40}
          </span>
          <span style={{ margin: "0 5px" }}>40GP</span>
          <span className="inline-block w-[45px] h-full text-center rounded-[16px] bg-[#4859c01a]">
            {price_40hq}
          </span>
          <span style={{ marginLeft: "5px" }}>40HQ</span>
        </div>
        <div onClick={() => setIsCollapse(!isCollapse)}>
          <Icon icon={isCollapse ? "zi-chevron-up" : "zi-chevron-down"} />
        </div>
      </div>

      {isCollapse && (
        <div>
          {[
            { label: "20GP", key: "20gp", value: price_20 },
            { label: "40GP", key: "40gp", value: price_40 },
            { label: "40HQ", key: "40hq", value: price_40hq },
          ].map((item) => (
            <div className="flex items-center mb-4 text-base" key={item.key}>
              <div className="inline-flex p-1 flex-1 items-center bg-[#4859c01a] rounded-[16px]">
                <button
                  onClick={() => reduceNum(item.key)}
                  disabled={item.value <= 0}
                >
                  <img
                    src={
                      item.value > 0
                        ? "/assets/icons/icon-minus.png"
                        : "/assets/icons/icon-minus-dis.png"
                    }
                    alt="reduce"
                  />
                </button>
                <input
                  value={item.value}
                  type="number"
                  readOnly
                  className="h-full w-full text-center inline-block text-base bg-transparent"
                />
                <button onClick={() => addNum(item.key)}>
                  <img src="/assets/icons/icon-add.png" alt="add" />
                </button>
              </div>
              <div className="w-[50px] font-bold text-right">
                <span className="collapse_font">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceCollapse;
