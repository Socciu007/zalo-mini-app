import { useToBeImplemented } from "hooks";
import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Checkbox,
  Header,
  Modal,
  Page,
  Text,
  useNavigate,
} from "zmp-ui";

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
  const [isAgree, setIsAgree] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const notifyWarning = useToBeImplemented({
    text: t("Please accept the privacy policy first"),
  });

  // Handle navigate to login page
  const handleNavigateToLoginPage = (type: 0 | 1) => {
    if (!isAgree) {
      notifyWarning();
      return;
    }
    if (type === 0) {
      setIsShowModal(true);
    } else {
      navigate("/auth/login");
    }
  };

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
              onChange={() => setIsAgree(!isAgree)}
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
          <Button
            className="w-full"
            onClick={() => handleNavigateToLoginPage(0)}
          >
            {t("Authorized Login")}
          </Button>
          <Button
            className="w-full bg-[#C7E0FF]"
            variant="tertiary"
            onClick={() => handleNavigateToLoginPage(1)}
          >
            {t("Phone Number Login")}
          </Button>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        actions={[
          {
            text: (
              <Button
                className="bg-[#3EBB6C] text-white rounded-[6px] justify-center"
                variant="secondary"
                onClick={() => setIsShowModal(false)}
              >
                {t("Confirm")}
              </Button>
            ),
          },
        ]}
        description={t(
          "Phone number verification is required, please complete the operation on your phone."
        )}
        visible={isShowModal}
        // onClose={() => setIsShowModal(false)}
        modalClassName="shadow-[0px_10px_24px_rgba(20,20,21,0.09)] z-50 opacity-100 modal-login"
      />
    </Page>
  );
};

export default AuthLoginPage;
