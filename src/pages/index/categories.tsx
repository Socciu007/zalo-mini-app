import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue } from "recoil";
import { fargoCategoriesState } from "state";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export const Categories: FC = () => {
  const { t } = useTranslation();
  const fargoCategories = useRecoilValue(fargoCategoriesState);
  const navigate = useNavigate();

  const handleToCategory = (categoryId: string) => {
    if (categoryId === "0") {
      navigate("/freight");
    } else if (categoryId === "2") {
      navigate("/express");
    } else {
      // navigate("/category");
    }
  };

  return (
    <Box className="bg-white grid grid-cols-3 gap-4 p-4">
      {fargoCategories.slice(0, 6).map((category, i) => (
        <div
          key={i}
          onClick={() => handleToCategory(category?.id)}
          className="flex flex-col space-y-2 items-center"
        >
          <img className="w-12 h-12" src={category.icon} />
          <Text size="xxSmall" className="text-gray">
            {t(category.eng)}
          </Text>
        </div>
      ))}
    </Box>
  );
};
