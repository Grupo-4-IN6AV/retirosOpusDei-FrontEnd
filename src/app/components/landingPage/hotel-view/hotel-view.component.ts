import { Component, OnInit } from '@angular/core';
import { ScriptRoomsService} from '../../../services/cargarScripts/script-rooms.service'
import Swiper from 'swiper';

@Component({
  selector: 'app-hotel-view',
  templateUrl: './hotel-view.component.html',
  styleUrls: ['./hotel-view.component.css']
})
export class HotelViewComponent implements OnInit {

  constructor
  (
    private CargarScripts: ScriptRoomsService
  )
  {
  }
  ngOnInit(): void
  {
  }

  viewBlock : boolean = true;
  viewList : boolean = false

  viewBlockRoom()
  {
    this.viewBlock = true;
    this.viewList = false
  }

  viewListRoom()
  {
    this.viewList = true
    this.viewBlock = false;
  }
}
