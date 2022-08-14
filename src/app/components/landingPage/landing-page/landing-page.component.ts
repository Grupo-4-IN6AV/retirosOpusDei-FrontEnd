import { Component, OnInit } from '@angular/core';
import { CargarScriptLangingPageService } from '../../../services/cargarScripts/cargar-script-langing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private _scriptsLandingPage: CargarScriptLangingPageService
  ) { 
    _scriptsLandingPage.Carga(["jquery.min"]);
    _scriptsLandingPage.Carga(["popper.min"]);
    _scriptsLandingPage.Carga(["bootstrap.min"]);
    _scriptsLandingPage.Carga(["owl.carousel"]);
    _scriptsLandingPage.Carga(["jquery.nav"]);
    _scriptsLandingPage.Carga(["jquery.easing.min"]);
    _scriptsLandingPage.Carga(["nivo-lightbox"]);
    _scriptsLandingPage.Carga(["jquery.magnific-popup.min"]);
    _scriptsLandingPage.Carga(["main"]);
  }

  ngOnInit(): void {
  }

}
