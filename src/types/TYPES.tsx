export interface RegisterProps {
    firstName:string,
    lastName:string,
    email: string,
    password: string,
    contact: number,
}
export interface LoginTypes {
    email: string,
    password: string,
    accessToken: string
}

export interface Blog {
  title: string;
  url: string;
  bloguuid: string;
  _id: string;
}

export interface ParentBlog {
  _id: string;
  uuid: string;
  blogs: Blog[];
  __v: number;
}

export interface ApiResponse {
  data: {
    blogs: ParentBlog[];
  };
}
