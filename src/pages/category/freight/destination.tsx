import React, { FC, useCallback, Suspense } from "react";
import { Page, Header, Box, Input, Text, useNavigate } from "zmp-ui";
import { useTranslation } from "react-i18next";
import { useRecoilValue, useRecoilState } from "recoil";
import { fargoDestinationState, keywordState, resultState, selectedDestinationState } from "state";
import { debounce } from "lodash";
import { ListItem } from "components/list-item";

const DestinationList: FC = () => {
  const { t } = useTranslation();
  const destination = useRecoilValue(fargoDestinationState);
  const [selectedDestination, setSelectedDestination] = useRecoilState(selectedDestinationState);
  const navigate = useNavigate();

  // Handle Click Destination
  const handleClickDestination = (des: string) => {
    setSelectedDestination(des);
    navigate("/freight");
  };

  return (
    <Box className="flex flex-col px-4">
      {destination?.map((item) => (
        <Box className="mb-4" key={item?.id}>
          <Text className="mb-2">{t(item?.routeEng)}</Text>
          <Box className="grid grid-cols-4 gap-2 gap-y-4">
            {item?.des?.map((des) => (
              <Box
                key={des?.id}
                onClick={() => handleClickDestination(des?.nameEng)}
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
  const result = useRecoilValue(resultState); 
  const [selectedDestination, setSelectedDestination] = useRecoilState(selectedDestinationState);
  const [keyword, setKeyword] = useRecoilState(keywordState);
  const navigate = useNavigate();

  // Handle Click Destination
  const handleClickDestination = (des: string) => {
    setSelectedDestination(des);
    navigate("/freight");
    setKeyword('');
  };

  return (
    <Box className="bg-white rounded-lg px-6">
      {result?.map(
        (item) =>
          !!item?.des?.length && (
            <Box key={item?.id}>
              {item?.des?.map((des) => (
                <Box key={des?.id} className="py-4 border-b border-[#f4f5f6]">
                  <ListItem
                    title={`${des?.nameEng} (${des?.name}) - ${item?.route}`}
                    onClick={() => handleClickDestination(des?.nameEng)}
                  />
                </Box>
              ))}
            </Box>
          )
      )}
    </Box>
  );
};

const DestinationFallback: FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="flex justify-center items-center">
      <Text>{t("Searching...")}</Text>
    </Box>
  );
};

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
        <Box className="p-4 transition-all ease-out flex-none">
          <Input.Search
            ref={(el) => {
              if (!el?.input?.value) {
                el?.focus();
              }
            }}
            clearable={true}
            defaultValue={keyword}
            onChange={(e) => handleChange(e?.target?.value)}
            className="rounded-full"
            placeholder={t("Chinese/English/Initial")}
          />
        </Box>

        {/* Destination List */}
        {keyword?.length > 0 ? (
          <Suspense fallback={<DestinationFallback />}>
            <DestinationSearch />
          </Suspense>
        ) : (
          <DestinationList />
        )}
      </Box>
    </Page>
  );
};

export default DestinationPage;
