import { createOrder } from "zmp-sdk";
import { getConfig } from "./config";

export function getDummyImage(filename: string) {
  return `https://stc-zmp.zadn.vn/templates/zaui-coffee/dummy/${filename}`;
}

export function getPictures(filename: string) {
  return `https://stc-zmp.zadn.vn/templates/zaui-coffee/pictures/${filename}`;
}

const pay = (amount: number, description?: string) =>
  createOrder({
    desc:
      description ??
      `Thanh toán cho ${getConfig((config) => config.app.title)}`,
    item: [],
    amount: amount,
    success: (data) => {
      console.log("Payment success: ", data);
    },
    fail: (err) => {
      console.log("Payment error: ", err);
    },
  });

export default pay;
