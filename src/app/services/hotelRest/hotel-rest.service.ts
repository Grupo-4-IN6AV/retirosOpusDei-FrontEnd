import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
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
  getHotels()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotels', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  saveHotel(params : {})
  {
    return this.http.post(environment.baseURI + 'hotel/saveHotel', params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getHotel(id : string)
  {
    return this.http.get(environment.baseURI + 'hotel/getHotel/' + id,  { headers: this.httpOptions });
  }

  getHotelsNameUp()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotelsNameUp',  { headers: this.httpOptions });
  }

  getHotelsNameDown()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotelsNameDown',  { headers: this.httpOptions });
  }

  getHotelName(params:{})
  {
    return this.http.post(environment.baseURI + 'hotel/getHotelName', params, { headers: this.httpOptions });
  }

  updateHotel(id : string, params : {})
  {
    return this.http.put(environment.baseURI + 'hotel/updateHotel/' + id,  params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken()) });
  }

  deleteHotel(id : string)
  {
    return this.http.delete(environment.baseURI + 'hotel/deleteHotel/' + id,  { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }


  //FUNCIONES DE ADMINISTRADOR DEL HOTEL//
  getHotelManager()
  {
    return this.http.get(environment.baseURI + 'hotel/getHotelManager', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  updateHotelManager(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'hotel/updateHotelManager/' + id, params,{ headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTotalClientes()
  {
    return this.http.get(environment.baseURI + 'hotel/getTotalClients', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

  getTotalMoney()
  {
    return this.http.get(environment.baseURI + 'hotel/getTotalMoney', { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())});
  }

    //CARGA DE IMAGEN//
    requestFiles(
      hotelID: string,
      files: Array<File>,
      name: string) {
      return new Promise((resolve, reject) => {
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        let uri = environment.baseURI + 'hotel/uploadImageHotel/' + hotelID;

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
