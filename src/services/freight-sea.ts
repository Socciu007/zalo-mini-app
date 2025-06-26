import http from "services";

// Get detail freight sea with origin and destination
export const getFreightSea = async (origin: string, destination: string) => {
  try {
    const response = await http.post("/client/freight/sea", {
      end_port: destination,
      page: "1",
      rank: "asc",
      size: "20gp",
      sort: null,
      start_port: origin,
      time: new Date().toISOString().split("T")[0],
      type: 2,
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