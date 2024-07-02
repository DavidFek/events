export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "USER";
}

export interface Event {
  id: number;
  name: string;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  likes: number;
  dislikes: number;
  createdBy: string;
  createdTime: Date;
  authors: Author[];
}

export interface Author {
  id: number;
  firstName: string;
  lastName: string;
  description: string;
  bornDate: Date;
  specializations: string;
  createdTime: Date;
  events: Event[];
}
