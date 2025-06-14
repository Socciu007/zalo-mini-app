import React from "react";
import { FC } from "react";
import { Box, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  categoriesState,
  selectedCategoryIdState,
  fargoCategoriesState,
} from "state";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export const Categories: FC = () => {
  const { t } = useTranslation();
  const fargoCategories = useRecoilValue(fargoCategoriesState);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  return (
    <Box className="bg-white grid grid-cols-3 gap-4 p-4">
      {fargoCategories.slice(0, 6).map((category, i) => (
        <div
          key={i}
          onClick={() => gotoCategory(category.id)}
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
