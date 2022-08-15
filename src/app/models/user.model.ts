export class UserModel {
  constructor(
      public id: string,
      public name: string,
      public age: number,
      public surname: string,
      public username: string,
      public password: string,
      public phone: string,
      public email: string,
      public role: string,
      public gender: string,
      public checked: boolean,
  ){}
}
