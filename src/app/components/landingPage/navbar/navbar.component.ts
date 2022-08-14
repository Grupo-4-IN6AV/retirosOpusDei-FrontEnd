import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //VARIABLES NAV-LINK//
  home: boolean = true;
  contactUs: boolean = false;
  aboutUs: boolean = false;
  hotel: boolean = false;

  constructor() { }

  ngOnInit(): void
  {

  }

  changeNavBar(id : string)
  {
      if (id === 'home')
    {
      this.home = true;
      this.contactUs = false;
      this.aboutUs = false;
      this.hotel = false;
    }
     if(id === 'about')
    {
      this.aboutUs = true;
      this.home = false;
      this.contactUs = false;
      this.hotel = false;
    }
     if (id === 'contact')
    {
      this.contactUs = true;
      this.aboutUs = false;
      this.home = false;
      this.hotel = false;
    }
      if (id === 'hotel')
    {
      this.hotel = true;
      this.contactUs = false;
      this.aboutUs = false;
      this.home = false;
    }
      if (id === 'not')
    {
      this.contactUs = false;
      this.aboutUs = false;
      this.home = false;
      this.hotel = false;
    }

  }
}
