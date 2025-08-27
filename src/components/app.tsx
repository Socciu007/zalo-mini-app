import React from "react";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import { RecoilRoot } from "recoil";
import { getConfig } from "@/utils/config";
import { Layout } from "@/components/layout";
import { ConfigProvider } from "@/components/config-provider";

const MyApp = () => {
  return (
    <RecoilRoot>
      <ConfigProvider
        cssVariables={{
          "--zmp-primary-color": getConfig((c) => c.template.primaryColor),
          "--zmp-background-color": "#f4f5f6",
        }}
      >
        <App>
          <ZMPRouter>
            <Layout />
          </ZMPRouter>
        </App>
      </ConfigProvider>
    </RecoilRoot>
  );
};
export default MyApp;
