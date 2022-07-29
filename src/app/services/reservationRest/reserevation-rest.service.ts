import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ReservationRestService {

  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.credentialReset.getToken(),
  });

  constructor
  (
    private credentialReset: CredentialsRestService,
    private http: HttpClient,
  )
  {
  }

  saveReservation(params:{})
  {
    return this.http.post(environment.baseURI + 'reservation/saveReservation', params ,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservationsUser()
  {
    return this.http.get(environment.baseURI + 'reservation/getReservationsUser', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservationsManager()
  {
    return this.http.get(environment.baseURI + 'reservation/getReservationsManager', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

}
