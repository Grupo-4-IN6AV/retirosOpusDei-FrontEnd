export class HotelModel {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public address: string,
        public email: string,
        public phone: string,
        public admin: string,
        public checked: boolean
    ){}
}