import React, { FC } from "react";
import { Page, Header, Box, Button, Text } from "zmp-ui";
import { useTranslation } from "react-i18next";

const ConsigneePage: FC = () => {
  const { t } = useTranslation();
  return (
    <Page className="flex flex-col overflow-x-hidden custom-scrollbar">
      <Header title="Consignee’s Address" />

      <Box className="flex flex-col bg-white mt-4 rounded-lg mx-4">
        <div className="mx-4 border-b border-[#E1E2E9] py-4">
          <div className="flex">
            <div className="tit w-24 shrink-0 text-gray-500">{t("From")}:</div>
            <div className="grow">
              <div className="font-medium text-[#19214F] opacity-40">
                CANADA
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 border-b border-[#E1E2E9] py-4">
          <div className="flex">
            <div className="tit w-24 shrink-0 text-gray-500">{t("To")}:</div>
            <div className="tit w-24 shrink-0 text-gray-500">
              {t("Please enter")}
            </div>
            <div className="grow">
              <div className="cont font-medium text-gray-900">V6V 1K9</div>
              <div className="cont1 mt-1 text-sm leading-snug text-gray-400">
                14551 Burrows Road Richmond BritishColumbia
              </div>
            </div>
          </div>
        </div>

        <div className="mx-4 py-4">
          <div className="flex">
            <div className="tit w-24 shrink-0 text-gray-500">
              {t("Package Details")}:
            </div>
            <div className="grow">
              <div className="cont font-medium text-gray-900">
                {t("Weight, volume (CBM), pieces")}
              </div>
            </div>
          </div>
        </div>
      </Box>

      <Button className="mt-8 mx-4 rounded-lg text-white">
        <Text>{t("Confirm")}</Text>
      </Button>
    </Page>
  );
};

export default ConsigneePage;
