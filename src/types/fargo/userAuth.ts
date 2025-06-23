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

export interface IUserAuth {
  token: string | null;
  user: IUser | null;
}