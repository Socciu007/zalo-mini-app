import http from "services";

export const login = async (data: { password: string; phone: string }) => {
  try {
    const response = await http.get(`/wx/wxLogin?password=${data.password}&username=${data.phone}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};