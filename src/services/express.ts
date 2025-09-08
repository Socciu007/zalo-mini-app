import http from "@/services";

// Get consignee address
export const getConsigneeAddress = async (address: string) => {
  try {
    const response = await http.post("/consignee/address", {
      address: address,
    });
    return response.data;
  } catch (error: any) {
    return { message: error.message, status: "ERROR" };
  }
};
