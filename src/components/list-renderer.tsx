import React, { ReactNode } from "react";
import { Box, Icon, Text } from "zmp-ui";

interface ListRendererProps<T> {
  title?: string;
  isMore?: boolean;
  items: T[];
  renderLeft: (item: T) => ReactNode;
  renderRight: (item: T) => ReactNode;
  onClick?: (item: T) => void;
}

export function ListRenderer<T>({
  title,
  items,
  renderLeft,
  renderRight,
  onClick,
  isMore,
}: ListRendererProps<T>) {
  return (
    <Box className="bg-background rounded-xl py-4">
      <Box className="flex items-center justify-between px-4">
        {title && <Text.Title className="text-xl">{title}</Text.Title>}
        {isMore && (
          <Text
            className="text-[#767a7f] text-base py-2 px-0 h-fit w-fit"
            onClick={() => {}}
          >
            全部订单
            <Icon icon="zi-chevron-right" />
          </Text>
        )}
      </Box>
      <Box className="grid grid-cols-4 px-6 gap-4 pt-2">
        {items?.map((item, i) => (
          <div
            key={i}
            onClick={() => onClick?.(item)}
            className="flex flex-col flex-1 items-center"
          >
            {renderLeft(item)}
            <Text className="text-center text-sm mt-1">
              {renderRight(item)}
            </Text>
          </div>
        ))}
      </Box>
    </Box>
  );
}
