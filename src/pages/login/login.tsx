import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Header,
  Icon,
  Input,
  Page,
  Text,
  useNavigate,
} from "zmp-ui";
import { WellComeFuanYuan } from "./index";
import { useToBeImplemented } from "hooks";
import zmp from "zmp-sdk";
import * as userService from "services/user";
import { triggerLoginState } from "state";
import { useSetRecoilState } from "recoil";
import { isValidPhoneNumber } from "utils";

interface UserLoginType {
  phone: string;
  code: string;
  password: string;
}

const LoginPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setTriggerLogin = useSetRecoilState(triggerLoginState);
  const [typeLogin, setTypeLogin] = useState<"phone" | "account">("phone");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [userLogin, setUserLogin] = useState<UserLoginType>({
    phone: "",
    code: "",
    password: "",
  });
  // Notify
  const notifyWarning = useToBeImplemented({
    type: "warning",
    text: t("Please enter phone/username or password"),
  });
  const notifyError = useToBeImplemented({
    type: "error",
    text: t("Login failed"),
  });
  const notifySuccess = useToBeImplemented({
    type: "success",
    text: t("Login successful"),
  });
  const notifyPhoneError = useToBeImplemented({
    type: "error",
    text: t("Invalid phone number format"),
  });
  const notifyPhoneError1 = useToBeImplemented({
    type: "error",
    text: t("Verification code is required"),
  });
  const notifyPhoneError2 = useToBeImplemented({
    type: "error",
    text: t("Enter the 4-digit code"),
  });

  // Handle select type login
  const handleSelectTypeLogin = (type: "phone" | "account") => {
    setUserLogin({ phone: "", code: "", password: "" });
    setTypeLogin(type);
  };

  // Handle change user login
  const handleChangeUserLogin = (key: keyof UserLoginType, value: string) => {
    setUserLogin({ ...userLogin, [key]: value });
  };

  // Handle login
  const handleLogin = async (type: "phone" | "account") => {
    if (type === "account") {
      if (userLogin?.phone === "" || userLogin?.password === "") {
        notifyWarning();
        return;
      }

      // Login by account
      const res = await userService.login(userLogin);
      if (res?.message == "success" || res?.message == "成功") {
        notifySuccess();
        zmp.setStorage({
          data: {
            Authorization: res?.token,
          },
          success: () => {
            setTriggerLogin((prev) => prev + 1);
            setUserLogin({ phone: "", code: "", password: "" });
            setTypeLogin("phone");
            navigate("/");
          },
          fail: () => {
            notifyError();
            setUserLogin({ phone: "", code: "", password: "" });
          },
        });
      } else {
        notifyError();
        setUserLogin({ phone: "", code: "", password: "" });
      }
      return;
    }
    if (type === "phone") {
      if (!isValidPhoneNumber(userLogin?.phone)) {
        notifyPhoneError();
        return;
      }
      if (userLogin?.code === "") {
        notifyPhoneError1();
        return;
      }
      if (userLogin?.code?.length !== 4) {
        notifyPhoneError2();
        return;
      }

      // Login by phone
      const res = await userService.loginByPhone(userLogin);
      if (res?.message == "success" || res?.message == "成功") {
        notifySuccess();
        zmp.setStorage({
          data: {
            Authorization: res?.token,
          },
          success: () => {
            setTriggerLogin((prev) => prev + 1);
            setUserLogin({ phone: "", code: "", password: "" });
            setTypeLogin("phone");
            navigate("/");
          },
          fail: () => {
            notifyError();
            setUserLogin({ phone: "", code: "", password: "" });
          },
        });
      } else {
        notifyError();
        setUserLogin({ phone: "", code: "", password: "" });
      }
      return;
    }
  };

  // Handle get code
  const handleGetCode = async () => {
    if (!isValidPhoneNumber(userLogin?.phone)) {
      notifyPhoneError();
      return;
    }
    const res = await userService.getCodeByPhone(userLogin?.phone);
    if (res?.message == "success" || res?.message == "成功") {
      notifySuccess();
    } else {
      notifyError();
    }
  };

  return (
    <Page
      className="relative flex-1 flex flex-col overflow-hidden"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <Header title={t("Login")} />
      <Box className="flex flex-col items-center justify-center mx-6">
        <WellComeFuanYuan />
        <Box className="mt-24 w-full flex flex-col items-center justify-center gap-4">
          <Box className="w-full border-b border-[#D9E2ED]">
            <Input
              clearable
              className="w-full border-none bg-transparent"
              value={userLogin?.phone}
              onChange={(e) => handleChangeUserLogin("phone", e?.target?.value)}
              placeholder={
                typeLogin === "phone"
                  ? t("Enter phone number")
                  : t("Enter phone number/account")
              }
              suffix={
                typeLogin === "phone" ? (
                  <Text className="text-[#A7AABB] w-[80px]" onClick={() => handleGetCode()}>
                    {t("Get code")}
                  </Text>
                ) : (
                  ""
                )
              }
            />
          </Box>
          <Box className="w-full border-b border-[#D9E2ED]">
            {typeLogin === "phone" && (
              <Input
                clearable
                className="w-full border-none bg-transparent"
                placeholder={t("Verification Code")}
                value={userLogin?.code}
                onChange={(e) =>
                  handleChangeUserLogin("code", e?.target?.value)
                }
              />
            )}
            {typeLogin === "account" && (
              <Input
                clearable
                className="w-full border-none bg-transparent"
                placeholder={t("Enter password")}
                suffix={
                  <Box
                    pr={4}
                    onClick={() => setIsShowPassword(!isShowPassword)}
                  >
                    <Icon icon={isShowPassword ? "zi-unhide" : "zi-hide"} />
                  </Box>
                }
                type={isShowPassword ? "text" : "password"}
                value={userLogin?.password}
                onChange={(e) =>
                  handleChangeUserLogin("password", e?.target?.value)
                }
              />
            )}
          </Box>
        </Box>
        <Box className="mt-24 flex flex-col items-center justify-center gap-2 w-full">
          <Button className="w-full" onClick={() => handleLogin(typeLogin)}>
            {t("Login")}
          </Button>
          {typeLogin === "phone" && (
            <Box className="flex items-center justify-between gap-2 w-full">
              <Text className="text-[#A7AABB]">
                {t("Business Registration")}
              </Text>
              <Text
                className="text-[#A7AABB]"
                onClick={() => handleSelectTypeLogin("account")}
              >
                {t("Account Login")}
              </Text>
            </Box>
          )}
          {typeLogin === "account" && (
            <Box className="flex items-center justify-between gap-2 w-full">
              <Text className="text-[#A7AABB]">{t("Forget Password")}</Text>
              <Text
                onClick={() => handleSelectTypeLogin("phone")}
                className="text-[#A7AABB]"
              >
                {t("Phone Login")}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Page>
  );
};

export default LoginPage;
