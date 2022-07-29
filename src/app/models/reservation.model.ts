export class ReservationModel {
  constructor(
      public id: string,
      public room: string,
      public hotel: string,
      public user: string,
      public totalPersons: number
  ){}
}
