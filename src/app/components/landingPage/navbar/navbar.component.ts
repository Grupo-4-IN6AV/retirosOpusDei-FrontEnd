import { Component, OnInit } from '@angular/core';
import {ScriptNavbarService} from 'src/app/services/cargarScripts/script-navbar.service'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private _ScriptsNavbar: ScriptNavbarService
  ) {
    _ScriptsNavbar.Carga(["menu"]);
   }

  ngOnInit(): void {
  }
}
