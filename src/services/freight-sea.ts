import http from "services";

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
  } catch (error) {
    return error;
  }
};