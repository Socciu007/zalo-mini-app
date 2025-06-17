import React, { FC, MouseEventHandler, ReactNode } from "react";
import { Box, Icon, Text } from "zmp-ui";

export interface ListItemProps {
  title: ReactNode;
  icon?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const ListItem: FC<ListItemProps> = ({ title, icon, onClick }) => {
  return (
    <Box flex className="space-x-2" onClick={onClick}>
      {icon && <img src={icon} alt="icon" />}
      <Box className="flex-1 space-y-[2px]">
        <Text>{title}</Text>
      </Box>
    </Box>
  );
};
