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

  addServicesReservation(id:string, params:{})
  {
    return this.http.post(environment.baseURI + 'reservation/addServiceReservation/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservations()
  {
    return this.http.get(environment.baseURI + 'reservation/getReservations', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getHistory()
  {
    return this.http.get(environment.baseURI + 'reservation/getHistory', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservation(id:string)
  {
    return this.http.get(environment.baseURI + 'reservation/getReservation/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  deleteReservation(id:string)
  {
    return this.http.delete(environment.baseURI + 'reservation/deleteReservation/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservationHotel(id: string)
  {
    return this.http.get(environment.baseURI + 'reservation/getReservationsHotel/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getReservationExtra()
  {
    return this.http.get(environment.baseURI + 'reservation/getReservationsExtra', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getBill(id:string)
  {
    return this.http.get(environment.baseURI + 'reservation/getBill/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

}
