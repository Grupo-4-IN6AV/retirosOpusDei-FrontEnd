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

  //CUALQUIER USUARIO//
  getRoomsHotel(id:string)
  {
    return this.http.get(environment.baseURI + 'room/getRoomByHotel/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getRoomsHotelPrice()
  {
    return this.http.get(environment.baseURI + 'room/getRoomsPrice' ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
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

  //FUNCIONES DEL ADMINISTRADOR DEL HOTEL//
  saveRoomHotel(params:{})
  {
    return this.http.post(environment.baseURI + 'room/saveRoomHotel', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getRoomsHotelAdmin()
  {
    return this.http.get(environment.baseURI + 'room/getRoomsHotelAdmin' ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  updateRoomHotel(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'room/updateRoomHotel/' + id , params, { headers: this.httpOptions});
  }

  deleteRoomHotel(id:string)
  {
    return this.http.delete(environment.baseURI + 'room/deleteRoomHotel/' + id ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  //CARGA DE IMAGEN//
  requestFiles(
    roomID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseURI + 'room/uploadImageRoom/' + roomID;

      for (var x = 0; x < files.length; x++) {
        formData.append(name, files[x], files[x].name);
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) { //AJAX status 4 = ok/done
          if (xhr.status == 200) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      }
      xhr.open('POST', uri, true);
      xhr.setRequestHeader('Authorization', this.credentialReset.getToken());
      xhr.send(formData)
    })
  }
}
