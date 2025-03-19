interface UserPayload {
  id: string;
  email: string;
  role: string;
  name: string;
}

declare namespace Express {
  export interface Request {
    currentUser?: UserPayload;
  }
  export interface Response {
    currentUser?: UserPayload;
  }
}
