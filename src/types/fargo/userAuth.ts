export interface IUser {
  cName?: string;
  cid?: number;
  companyStatus?: number;
  exp?: number;
  iat?: number;
  isAdmin?: boolean;
  name?: string;
  pUid?: number;
  status?: number;
  type?: number;
  uid?: number;
  userId?: number;
  username?: string;
}

export interface IInfoUser {
  id: number;
  username: string;
  place: string;
  name: string;
  qq: string;
  wechat: string;
  phone: string;
  email: string;
  avatar: string;
  address: string;
  rocket: number
}

export interface IUserAuth {
  token: string | null;
  user: IUser | null;
}