import http from "services";

// Login by account
export const login = async (data: { password: string; phone: string }) => {
  try {
    const response = await http.get(`/wx/wxLogin?password=${data.password}&username=${data.phone}`);
    return response.data;
  } catch (error: any) {
    return false;
  }
};

// Login by phone
export const loginByPhone = async (data: { phone: string; code: string }) => {
  try {
    const response = await http.get(`/wx/phoneLogin?code=${data.code}&code=${data.phone}`);
    return response.data;
  } catch (error: any) {
    return false;
  }
};

// Get code by phone
export const getCodeByPhone = async (phone: string) => {
  try {
    const response = await http.get(`/wx/captcha?phone=${phone}`);
    return response.data;
  } catch (error: any) {
    return false;
  }
};
