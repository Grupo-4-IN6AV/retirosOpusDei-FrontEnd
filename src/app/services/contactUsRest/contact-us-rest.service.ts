import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class ContactUsRestService {

  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient,
    private spinnerService: NgxSpinnerService
  ) { }

  sendMessage(params: {}) {
    let body = JSON.stringify(params);
    return this.http.post(environment.baseURI + 'contact/sendMessage', body, { headers: this.httpOptions });
  }

  startSpinner(){
    this.spinnerService.show();
  }

  stopSpinner(){
    this.spinnerService.hide();
  }
}
