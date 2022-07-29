import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class EventRestService
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
  getEvents()
  {
    return this.http.get(environment.baseURI + 'event/getEvents', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveEvent(params : {})
  {
    return this.http.post(environment.baseURI + 'event/saveEvent', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getEvent(id : string)
  {
    return this.http.get(environment.baseURI + 'event/getEvent/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateEvent(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'event/updateEvent/' + id, params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  searchEvent(params : {})
  {
    return this.http.post(environment.baseURI + 'event/getEventsName', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteEvent(id : string)
  {
    return this.http.delete(environment.baseURI + 'event/deleteEvent/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  //FUNCIONES DE ADMINISTRADOR DEL HOTEL//
  getEventsHotel()
  {
    return this.http.get(environment.baseURI + 'event/getEventsHotel', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveEventHotel(params : {})
  {
    return this.http.post(environment.baseURI + 'event/saveEventHotel', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteEventHotel(id : string)
  {
    return this.http.delete(environment.baseURI + 'event/deleteEventHotel/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getEventsHotelID(id:string)
  {
    return this.http.get(environment.baseURI + 'event/getEventsHotelID/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  //CARGA DE IMAGEN//
  requestFiles(
    eventID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseURI + 'event/uploadImageEvent/' + eventID;

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
