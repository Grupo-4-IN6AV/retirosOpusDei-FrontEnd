import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesRestService
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
  getServices()
  {
    return this.http.get(environment.baseURI + 'service/getServices', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveService(params : {})
  {
    return this.http.post(environment.baseURI + 'service/saveService', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  searchService(params : {})
  {
    return this.http.post(environment.baseURI + 'service/searchService', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getService(id : string)
  {
    return this.http.get(environment.baseURI + 'service/getService/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateService(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'service/updateService/' + id,  params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteService(id : string)
  {
    return this.http.delete(environment.baseURI + 'service/deleteService/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }


  //FUNCIONES DE ADMINISTRADOR DEL HOTEL//
  getServicesHotel()
  {
    return this.http.get(environment.baseURI + 'service/getServicesHotel', {headers:this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }

  saveServiceHotel(params : {})
  {
    return this.http.post(environment.baseURI + 'service/saveServiceHotel', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getServiceHotel(id:string)
  {
    return this.http.get(environment.baseURI + 'service/getServiceHotel/' + id, {headers:this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }

  deleteServiceHotel(id : string)
  {
    return this.http.delete(environment.baseURI + 'service/deleteServiceHotel/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  updateServiceHotel(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'service/updateServiceHotel/' + id,  params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  saveIconService(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'service/saveIconService/' + id,  params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  getServicesHotelID(id:string)
  {
    return this.http.get(environment.baseURI + 'service/getServiceHotelID/'+ id, {headers:this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }
}
