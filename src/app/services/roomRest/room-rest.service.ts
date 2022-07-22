import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
    return this.http.get(environment.baseURI + 'room/getRooms' ,{ headers: this.httpOptions});
  }

  saveRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'room/saveRoom', params, { headers: this.httpOptions});
  }
}
