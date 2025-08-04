import http from "services";

// Get detail freight sea with origin and destination
export const getFreightSea = async (origin: string, destination: string) => {
  try {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    const response = await http.post("/client/freight/sea", {
      start_port: origin,
      end_port: destination,
      page: 1,
      rank: "asc",
      sizeset: "20GP/40GP/40HQ",
      size: "20gpSell",
      time: date.toISOString().split("T")[0]
    });
    return response.data;
  } catch (error: any) {
    return { message: error.message, status: "ERROR" };
  }
};

// Get list freight sea
export const getListFreightSea = async () => {
  try {
    const response = await http.get("/client/freight/sea/getspecialfreight");
    return response.data;
  } catch (error: any) {
    return { message: error.message, status: "ERROR" };
  }
};