import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
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
    return this.http.get(environment.baseURI + 'typeRoom/getTypesRooms' ,{ headers: this.httpOptions});
  }

  getTypesRoomsHotel(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypesRoomsHotel/' + id ,{ headers: this.httpOptions});
  }

  getTypeRoom(id:string)
  {
    return this.http.get(environment.baseURI + 'typeRoom/getTypeRoom/' + id ,{ headers: this.httpOptions});
  }

  deleteTypeRoom(id:string)
  {
    return this.http.delete(environment.baseURI + 'typeRoom/deleteTypeRoom/' + id ,{ headers: this.httpOptions});
  }

  updateTypeRoom(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'typeRoom/updateTypeRoom/' + id , params, { headers: this.httpOptions});
  }

  saveTypeRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'typeRoom/saveTypeRoom', params, { headers: this.httpOptions });
  }

  searchTypeRoom(params:{})
  {
    return this.http.post(environment.baseURI + 'typeRoom/searchTypeRooms', params, { headers: this.httpOptions });
  }
}
