import { Component, OnInit } from '@angular/core';
import {ContactModel} from 'src/app/models/contact.model';
import { ContactUsRestService } from 'src/app/services/contactUsRest/contact-us-rest.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contact: ContactModel;

  constructor(
    private router: Router,
    private ContactUsRest: ContactUsRestService,
  ) {
    this.contact = new ContactModel('', '', '', '');
  }

  ngOnInit(): void {
  }

  sendMessage(contactForm: any) {
    this.ContactUsRest.startSpinner();
    setTimeout(() => {
      this.ContactUsRest.stopSpinner();
    }, 2200);
    this.ContactUsRest.sendMessage(this.contact).subscribe
      ({
        next: (res: any) => {
          Swal.fire({
            title: res.message,
            confirmButtonColor: '#28B463'
          });
          contactForm.reset();
        },
        error: (err: any) => {
          Swal.fire({
            icon: 'error',
            title: err.error.message || err.error,
            confirmButtonColor: '#E74C3C'
          });
          contactForm.reset();
        }
      })
  }
}
