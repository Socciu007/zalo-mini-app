import http from "@/services";

// Get detail freight sea with origin and destination
export const getFreightSea = async (origin: string, destination: string, date: string) => {
  try {
    const response = await http.post("/client/freight/sea", {
      start_port: origin,
      end_port: destination,
      page: 1,
      rank: "asc",
      sizeset: "20GP/40GP/40HQ",
      size: "20gpSell",
      time: date
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

// Get schedule freight sea
export const getScheduleFreightSea = async (query: any) => {
  try {
    const response = await http.get(`/client/schedule/query?scid=${query?.scid}&code=${query.code}&start_port_id=${query.startPortId}&schedule=${query.schedule}`);
    return response.data;
  } catch (error: any) {
    return { message: error.message, status: "ERROR" };
  }
};

// Get more quotes freight sea
export const getMoreQuotesFreightSea = async (query: any) => {
  try {
    const response = await http.get(`/client/freight/sea/getFuturePrice?startPortId=${query?.startPortId}&endPortId=${query?.endPortId}&transferPortId=${query?.transferPortId}&scid=${query?.scid}&routeId=${query?.routeId}&sailingDay=${query?.sailingDay}&firstSupply=${query?.firstSupply}`, 
);
    return response.data;
  } catch (error: any) {
    return { message: error.message, status: "ERROR" };
  }
};