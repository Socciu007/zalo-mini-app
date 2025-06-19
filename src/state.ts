import { atom, selector } from "recoil";
import { getLocation, getPhoneNumber, getUserInfo } from "zmp-sdk";
import { wait } from "utils/async";
import { Category as FCategory } from "types/fargo/category";
import { Booking } from "types/fargo/booking";
import { Destination } from "types/fargo/destination";
import fargoCategories from "../mock/fargo/categories.json";
import fargoBooking from "../mock/fargo/booking.json";
import fargoDestination from "../mock/fargo/destination.json";
import http from "services";

export const userState = selector({
  key: "user",
  get: async () => {
    const { userInfo } = await getUserInfo({ autoRequestPermission: true });
    return userInfo;
  },
});

// Get fargo categories
export const fargoCategoriesState = selector<FCategory[]>({
  key: "fargoCategories",
  get: () => fargoCategories as FCategory[],
});

// Get fargo booking
export const fargoBookingState = selector<Booking[]>({
  key: "fargoBooking",
  get: () => fargoBooking as Booking[],
});

// Get fargo destination
export const fargoDestinationState = selector<Destination[]>({
  key: "fargoDestination",
  get: () => fargoDestination as Destination[],
});

// Keyword Search
export const keywordState = atom({
  key: "keyword",
  default: "",
});

// Search Destination
export const resultState = selector<Destination[]>({
  key: "result",
  get: async ({ get }) => {
    const keyword = get(keywordState);
    if (!keyword.trim()) {
      return [];
    }
    const destinations = get(fargoDestinationState);
    await wait(500);
    const result = destinations?.map((destination) => {
      return {
        ...destination,
        des: destination?.des?.filter((des) => {
          return des?.nameEng?.trim()?.toLowerCase()?.includes(keyword?.trim()?.toLowerCase());
        }),
      };
    });

    return result;
  },
});

// Selected Destination
export const selectedDestinationState = atom<string | null>({
  key: "selectedDestination",
  default: null,
});

// Selected Origin
export const selectedOriginState = atom<string | null>({
  key: "selectedOrigin",
  default: 'SHANGHAI',
});

// Get all /client/freight/sea
export const freightSeaState = selector({
  key: "freightSea",
  get: async ({ get }) => {
    const origin = get(selectedOriginState);
    const destination = get(selectedDestinationState);
    console.log('origin', origin);
    console.log('destination', destination);

    if (!origin || !destination) {
      return [];
    }

    const response = await http.post("/client/freight/sea", {
      "end_port": destination,
      "page": "1",
      "rank": "asc",
      "size": "20gp",
      "sort": null,
      "start_port": origin,
      "time": new Date().toISOString().split("T")[0],
      "type": 2
    });
    console.log('response', response);
    return response || [];
  },
});

export const selectedDeliveryTimeState = atom({
  key: "selectedDeliveryTime",
  default: +new Date(),
});

export const requestLocationTriesState = atom({
  key: "requestLocationTries",
  default: 0,
});

export const requestPhoneTriesState = atom({
  key: "requestPhoneTries",
  default: 0,
});

export const locationState = selector<
  { latitude: string; longitude: string } | false
>({
  key: "location",
  get: async ({ get }) => {
    const requested = get(requestLocationTriesState);
    if (requested) {
      const { latitude, longitude, token } = await getLocation({
        fail: console.warn,
      });
      if (latitude && longitude) {
        return { latitude, longitude };
      }
      if (token) {
        console.warn(
          "Sử dụng token này để truy xuất vị trí chính xác của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập vị trí mặc định: VNG Campus");
        return {
          latitude: "10.7287",
          longitude: "106.7317",
        };
      }
    }
    return false;
  },
});

export const phoneState = selector<string | boolean>({
  key: "phone",
  get: async ({ get }) => {
    const requested = get(requestPhoneTriesState);
    if (requested) {
      try {
        const { number, token } = await getPhoneNumber({ fail: console.warn });
        if (number) {
          return number;
        }
        console.warn(
          "Sử dụng token này để truy xuất số điện thoại của người dùng",
          token
        );
        console.warn(
          "Chi tiết tham khảo: ",
          "https://mini.zalo.me/blog/thong-bao-thay-doi-luong-truy-xuat-thong-tin-nguoi-dung-tren-zalo-mini-app"
        );
        console.warn("Giả lập số điện thoại mặc định: 0337076898");
        return "0337076898";
      } catch (error) {
        // Xử lý exception
        console.error(error);
        return false;
      }
    }

    return false;
  },
});

export const orderNoteState = atom({
  key: "orderNote",
  default: "",
});
