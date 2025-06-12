import React, { FC } from "react";
import { Booking } from "types/fargo/booking";
import { Box, Text } from "zmp-ui";

export const ProductItem: FC<{ data: Booking }> = ({ data }) => {
  return (
    <Box>
      <Box className="bg-white rounded-md" onClick={() => {}}>
        {/* Line 1: Origin -> Destination */}
        <Box className="flex p-4 items-center justify-between text-center border-b border-[#a6a6a930] pb-5">
          <Box>
            <Text className="text-sm font-semibold text-[#2b2b2b] mb-2">
              {data?.port}
            </Text>
            <Text className="text-xs text-gray-500 text-start">
              {data?.portChi}
            </Text>
          </Box>

          <img src="assets/icons/icon-boat.png" />

          <Box>
            <Text className="text-sm font-semibold text-[#2b2b2b]">
              {data?.destination}
            </Text>
            <Text className="text-xs text-gray-500 text-end">
              {data?.destinationChi}
            </Text>
          </Box>
        </Box>

        {/* Line 2: Departure date and Price */}
        <Box className="flex justify-between items-center py-3 px-4 text-sm">
          <Text className="text-gray-500">
            <span className="text-[#2b2b2b]">开航日: {data?.time}</span>
          </Text>
          <Text className="text-[#ce1a1abd] font-medium">
            {data?.price}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
