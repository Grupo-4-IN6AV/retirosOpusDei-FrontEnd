import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeRoomRestService
{

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  ) { }

  //FUNCIONES DE ADMINISTRADOR//
  getTypeRooms()
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypesRooms' ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTypesRoomsHotel(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypesRoomsHotel/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTypeRoom(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoom/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  deleteTypeRoom(id:string)
  {
    return this.http.delete(environment.baseURI + 'typeRoom/deleteTypeRoom/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  updateTypeRoom(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'typeRoom/updateTypeRoom/' + id , params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  saveTypeRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'typeRoom/saveTypeRoom', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  searchTypeRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'typeRoom/searchTypeRooms', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  //FUNCIONES DE ADMINISTRADOR DEL HOTEL//
  getTypeRoomHotel()
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoomHotel' ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  saveTypeRoomHotel(params:{})
  {
    return this.http.post(environment.baseURI + 'typeRoom/saveTypeRoomHotel', params ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTypeRoomHotelOne(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoomHotel/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  updateTypeRoomHotel(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'typeRoom/updateTypeRoomHotel/' + id , params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  deleteTypeRoomHotel(id:string)
  {
    return this.http.delete(environment.baseURI + 'typeRoom/deleteTypeRoomHotel/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTypesRoomsHotelAdd(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoomHotelAdd/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }
}
