import React, { FC, useCallback, Suspense } from "react";
import { Page, Header, Box, Input, Text } from "zmp-ui";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useRecoilState } from "recoil";
import { fargoDestinationState, keywordState, resultState } from "state";
import { debounce } from "lodash";

const DestinationList: FC = () => {
  const { t } = useTranslation();
  const destination = useRecoilValue(fargoDestinationState);
  return (
    <Box className="flex flex-col px-4">
      {destination?.map((item) => (
        <Box className="mb-4" key={item?.id}>
          <Text className="mb-2">{t(item?.routeEng)}</Text>
          <Box className="grid grid-cols-4 gap-2 gap-y-4">
            {item?.des?.map((des) => (
              <Box
                key={des?.id}
                className="flex gap-1 flex-col bg-white rounded-lg py-2 px-1 justify-center items-center"
              >
                <Text className="text-center">
                  {des?.name?.length < 5
                    ? des?.name
                    : des?.name?.slice(0, 4) + "..."}
                </Text>
                <Text className="text-center">
                  {des?.nameEng?.length < 9
                    ? des?.nameEng
                    : des?.nameEng?.slice(0, 7) + "..."}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

const DestinationSearch: FC = () => {
  const { t } = useTranslation();
  const result = useRecoilValue(resultState);

  console.log("result", result);
  return (
    <Box>
      <Text>{t("Keep typing to search")}</Text>
    </Box>
  );
}

const DestinationFallback: FC = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Text>{t("Đang tìm kiếm...")}</Text>
    </Box>
  );
}

const DestinationPage: FC = () => {
  const { t } = useTranslation();
  const [keyword, setKeyword] = useRecoilState(keywordState);

  const handleChange = useCallback(
    debounce((keyword: string) => {
      setKeyword(keyword);
    }, 100),
    []
  );
  return (
    <Page className="flex flex-col">
      <Header title={t("Destination Search")} />
      <Box className="flex flex-col h-full">
        <Box className="p-4">
          <Input.Search
            value={keyword}
            onChange={(e) => handleChange(e?.target?.value)}
            className="rounded-full"
            placeholder={t("Chinese/English/Initial")}
            clearable
            allowClear
          />
        </Box>

        {/* Destination List */}
        <DestinationList />
        <Suspense fallback={<DestinationFallback />}>
          <DestinationSearch />
        </Suspense>
      </Box>
    </Page>
  );
};

export default DestinationPage;
