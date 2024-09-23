export interface AppUser{
  id:number;
  username:string;
  password:string;
  role:String[];
  firstName:string;
  lastName: string;
  niveau: string | undefined;
  classe: string | undefined;

  email: string;
  _links: {
    self: {
      href: string
    };
    admin: {
      href: string
    };
  }
}
