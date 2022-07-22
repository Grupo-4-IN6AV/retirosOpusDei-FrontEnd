export class RoomModel {
  constructor(
      public id: string,
      public name: string,
      public typeRoom: string,
      public description: string,
      public price: number,
      public hotel: string,
  ){}
}
