import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CredentialsRestService } from '../credentialsRest/credentials-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UserRestService
{

  dataUser:any

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

  //FUNCIONES DE ADMINISTRADOR//
  getUsers()
  {
    return this.http.get(environment.baseURI + 'user/getUsers', { headers: this.httpOptions });
  }

  saveUser(params:{})
  {
    return this.http.post(environment.baseURI + 'user/saveUser', params, { headers: this.httpOptions });
  }

  searchUser(params:{})
  {
    return this.http.post(environment.baseURI + 'user/searchUsers', params, { headers: this.httpOptions });
  }

  deleteUser(id:string)
  {
    return this.http.delete(environment.baseURI + 'user/deleteUser/' + id, { headers: this.httpOptions });
  }

  updateUser(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'user/updateUser/' + id, params, { headers: this.httpOptions });
  }

  getUser(id:string)
  {
    return this.http.get(environment.baseURI + 'user/getUser/' + id, { headers: this.httpOptions });
  }

  //Control de Tablas//
  getUsersNameUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersNameUp', { headers: this.httpOptions });
  }

  getUsersNameDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersNameDown', { headers: this.httpOptions });
  }

  getUsersSurnameUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersSurnameUp', { headers: this.httpOptions });
  }

  getUsersSurnameDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersSurnameDown', { headers: this.httpOptions });
  }

  getUsersUsernameUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersUsernameUp', { headers: this.httpOptions });
  }

  getUsersUsernameDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersUsernameDown', { headers: this.httpOptions });
  }

  getUsersAgeUp()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAgeUp', { headers: this.httpOptions });
  }

  getUsersAgeDown()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAgeDown', { headers: this.httpOptions });
  }

  getUsersClient()
  {
    return this.http.get(environment.baseURI + 'user/getUsersClient', { headers: this.httpOptions });
  }

  getUsersAdminHotel()
  {
    return this.http.get(environment.baseURI + 'user/getUsersAdminHotel', { headers: this.httpOptions });
  }



  //FUNCIONES DEL CLIENTE - HOTEL-ADMIN//

  updateAccount(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'user/updateAccount/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }

  changePassword(id:string, params:{})
  {
    return this.http.put(environment.baseURI + 'user/changePassword/' + id, params, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }

  deleteAccount(id:string)
  {
    return this.http.delete(environment.baseURI + 'user/deleteUser/' + id, { headers: this.httpOptions.set('Authorization', this.credentialReset.getToken())})
  }

  requestFiles(
    userID: string,
    files: Array<File>,
    name: string) {
    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      let uri = environment.baseURI + 'user/uploadImage/' + userID;

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
