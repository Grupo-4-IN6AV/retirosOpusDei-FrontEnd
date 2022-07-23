import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoomRestService
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
  getRooms()
  {
    return this.http.get(environment.baseURI + 'room/getRooms' ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getRoomsHotel(id:string)
  {
    return this.http.get(environment.baseURI + 'room/getRoomByHotel/' + id ,{ headers: this.httpOptions});
  }

  saveRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'room/saveRoom', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getRoom(id:string)
  {
    return this.http.get(environment.baseURI + 'room/getRoom/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  searchRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'room/searchRoom', params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  deleteRoom(id:string)
  {
    return this.http.delete(environment.baseURI + 'room/deleteRoom/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  updateRoom(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'room/updateRoom/' + id , params, { headers: this.httpOptions});
  }
}
