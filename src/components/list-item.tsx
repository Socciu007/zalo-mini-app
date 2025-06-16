import React, { FC, MouseEventHandler, ReactNode } from "react";
import { Box, Icon, Text } from "zmp-ui";

export interface ListItemProps {
  title: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const ListItem: FC<ListItemProps> = ({ title, onClick }) => {
  return (
    <Box flex className="space-x-2" onClick={onClick}>
      <img src={"assets/icons/icon-boat2.png"} alt="boat" />
      <Box className="flex-1 space-y-[2px]">
        <Text>{title}</Text>
      </Box>
    </Box>
  );
};
