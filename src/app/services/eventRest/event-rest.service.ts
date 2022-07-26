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
}
