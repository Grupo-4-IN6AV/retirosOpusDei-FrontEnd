export class EventModel {
  constructor(
      public id: string,
      public name: string,
      public description: string,
      public startHour: string,
      public endHour: string,
      public hotel: string,
  ){}
}
