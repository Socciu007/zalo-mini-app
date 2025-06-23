import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Checkbox, Header, Page, Text, useNavigate } from "zmp-ui";

// WellCome FuanYuan
export const WellComeFuanYuan: FC = () => {
  const { t } = useTranslation();
  return (
    <Box className="mt-16 mx-auto flex flex-col items-center justify-center">
      <img
        className="w-[138px] h-[163px]"
        src="https://www.dadaex.cn/api/static/upload/wximg/logo.png"
      ></img>
      <Text className="mt-1.5 text-[#19214F] text-2xl">
        {t("Welcome to FanYuan!")}
      </Text>
    </Box>
  );
};

const AuthLoginPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Page
      className="relative flex-1 flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Header title={t("Authorize Login")} />
      <Box className="flex flex-col items-center justify-center mx-6">
        <WellComeFuanYuan />
        <Box className="mt-24 flex flex-col items-center justify-center gap-4">
          <Box className="">
            <Checkbox
              value=""
              children={
                <Text className="text-base">
                  {t("I have read and agree to the")}{" "}
                  <a className="text-[#4859C0]" href="#">
                    {t("Terms ")}
                  </a>
                  <p className="inline-block">{t("&")}</p>
                  <a className="text-[#4859C0]" href="#">
                    {t(" Privacy Policy.")}
                  </a>
                </Text>
              }
            />
          </Box>
          <Button className="w-full">{t("Authorized Login")}</Button>
          <Button
            className="w-full bg-[#C7E0FF]"
            variant="tertiary"
            onClick={() => navigate("/auth/login")}
          >
            {t("Phone Number Login")}
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default AuthLoginPage;
