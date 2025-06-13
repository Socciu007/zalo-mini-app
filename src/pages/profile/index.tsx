import React, { FC } from "react";
import { Box, Icon, Page, Text, Button } from "zmp-ui";
import { ListRenderer } from "components/list-renderer";
import { useToBeImplemented } from "hooks";

const HeaderProfile: FC = () => {
  return (
    <Box className="relative h-20">
      <Box
        className="absolute top-0 left-0 w-full h-20 z-0"
        style={{
          background: "linear-gradient(to bottom, #A8B4FF 0%, #E6ECFF 100%)",
        }}
      />
    </Box>
  );
};

// 个人信息
const Personal: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6 mt-2">
      <ListRenderer
        title="我的订单"
        onClick={onClick}
        isMore={true}
        items={[
          {
            icon: <img className="w-12 h-12" src="/assets/icons/icon-tag.png" alt="tag" />,
            title: "新订单",
          },
          {
            icon: <img className="w-12 h-12" src="/assets/icons/icon-contact.png" alt="contact" />,
            title: "已审",
          },
          {
            icon: <img className="w-12 h-12" src="assets/icons/icon-list1.png" alt="list1" />,
            title: "订舱",
          },
          {
            icon: <img className="w-12 h-12" src="assets/icons/icon-list2.png" alt="list2" />,
            title: "预配",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => item.title}
      />
    </Box>
  );
};

// 企业管理
const Company: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title="企业管理"
        onClick={onClick}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-seal.png"
                alt="seal"
              />
            ),
            title: "企业认证",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-building.png"
                alt="building"
              />
            ),
            title: "企业管理",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-hospital.png"
                alt="hospital"
              />
            ),
            title: "加入企业",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-group.png"
                alt="group"
              />
            ),
            title: "邀请加入",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => item.title}
      />
    </Box>
  );
};

// 个人支付
const PersonalPay: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title="我的订单"
        onClick={onClick}
        isMore={true}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-card.png"
                alt="card"
              />
            ),
            title: "新订单",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-loading.png"
                alt="loading"
              />
            ),
            title: "已审",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list3.png"
                alt="list3"
              />
            ),
            title: "订舱",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-completed.png"
                alt="completed"
              />
            ),
            title: "预配",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => item.title}
      />
    </Box>
  );
};

// 其他功能
const Other: FC = () => {
  const onClick = useToBeImplemented();

  return (
    <Box className="m-6">
      <ListRenderer
        title="其他功能"
        onClick={onClick}
        items={[
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-news.png"
                alt="news"
              />
            ),
            title: "我的模板",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="/assets/icons/icon-wallet.png"
                alt="wallet"
              />
            ),
            title: "我的收藏",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-list4.png"
                alt="list4"
              />
            ),
            title: "电子合同",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-setting.png"
                alt="setting"
              />
            ),
            title: "合同注册",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-message.png"
                alt="message"
              />
            ),
            title: "微信推送",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-write.png"
                alt="write"
              />
            ),
            title: "修改密码",
          },
          {
            icon: (
              <img
                className="w-12 h-12"
                src="assets/icons/icon-logout.png"
                alt="logout"
              />
            ),
            title: "退出账号",
          },
        ]}
        renderLeft={(item) => item.icon}
        renderRight={(item) => item.title}
      />
    </Box>
  );
};

const ProfilePage: FC = () => {
  return (
    <Page
      className="relative flex-1 flex flex-col"
      style={{ backgroundColor: "var(--zmp-background-color)" }}
    >
      <HeaderProfile />
      {/* Profile List */}
      <Box className="flex-1 overflow-auto">
        {/* Avatar Header */}
        <Box className="h-20 bg-[#E6ECFF] shadow-md shadow-[#f4f5f6]">
          <Box className="flex items-end justify-between border-t border-[#fff] px-6">
            <Box className="flex items-end space-x-2">
              <Box className="w-16 h-16 rounded-full bg-[#f4f5f6] flex items-center justify-center">
                <Icon icon="zi-user" className="text-black text-4xl" />
              </Box>
              <Text className="text-black text-xl font-bold drop-shadow-md leading-loose">
                请点击登录
              </Text>
            </Box>
            <Button
              variant="secondary"
              className="text-[#0019FF] text-lg bg-white bg-opacity-30 py-2 px-0 h-fit w-fit"
            >
              个人信息
            </Button>
          </Box>
        </Box>
        <Personal />
        <Company />
        <PersonalPay />
        <Other />
      </Box>
    </Page>
  );
};

export default ProfilePage;
