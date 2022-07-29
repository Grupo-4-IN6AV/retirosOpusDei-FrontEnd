import { Component, OnInit } from '@angular/core';
import { ServiceModel } from 'src/app/models/service.model';
import { HotelRestService } from 'src/app/services/hotelRest/hotel-rest.service';
import { ServicesRestService } from 'src/app/services/servicesRest/services-rest.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.css']
})
export class ServicesAdminComponent implements OnInit
{

  //Variables de TypeScript//
  services: any;
  hotels: any;
  service: ServiceModel;
  searchService: any
  serviceView: any;
  serviceUpdate: any;
  showTableServices: boolean = false;
  reset: any;
  serviceDeleted:any;
  controloClick : number = 0
  buttonActions : boolean = false

  notFound: boolean = false;
  //PRECIOS EN QUETZALES//
  newPrices : any;
  newPrice : any;

  constructor
  (
    private hotelRest : HotelRestService,
    private serviceRest: ServicesRestService
  )
  {
    this.service = new ServiceModel('', '', '', 1,'');
  }

  ngOnInit(): void
  {
    this.getHotels();
    this.getServices()
  }

  getServices()
  {
    this.serviceRest.getServices().subscribe({
      next: (res: any) =>
      {
        this.services = res.services;
        var arrayPrices = [];
        for(var key=0; key<this.services.length; key++)
        {
            var actualPrice = this.services[key].price;
            var stringPrices = actualPrice.toString();
            var checkPrice = stringPrices.includes(".")
            if(checkPrice == true)
            {
              arrayPrices.push(stringPrices);
            }
            else if (checkPrice == false)
            {
              var newPrice = stringPrices+'.00'
              arrayPrices.push(newPrice);
            }
        }
        this.newPrices = arrayPrices;
      },
      error: (err) => console.log(err)
    })
  }

  getHotels()
  {
    this.hotelRest.getHotels().subscribe({
      next: (res: any) =>
      {
        this.hotels = res.hotels
      },
      error: (err) => console.log(err)
    })
  }

  saveService(addServiceForm : any)
  {
    this.serviceRest.saveService(this.service).subscribe
    ({
      next: (res: any) => {
        Swal.fire
          ({
            icon: 'success',
            title: res.message,
            confirmButtonColor: '#28B463'
          });
        this.getServices();
        addServiceForm.reset();
      },
      error: (err: any) => {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
        addServiceForm.reset();
      },
    })
    addServiceForm.reset();
  }

  getService(id : string)
  {
    this.serviceRest.getService(id).subscribe({
      next: (res: any) => {
        this.serviceView = res.service;
        this.serviceUpdate = res.service;
        this.serviceDeleted = res.service;
        var actualPrice = res.service.price;
        var stringPrice = actualPrice.toString();
        var checkPrice = stringPrice.includes(".")
        if(checkPrice == true)
        {
          this.newPrice = stringPrice
        }
        else if (checkPrice == false)
        {
          this.newPrice = stringPrice+'.00'
        }
      },
      error: (err) => {alert(err.error.message)}
    })
  }


  updateService()
  {
    this.serviceRest.updateService(this.serviceUpdate._id, this.serviceUpdate).subscribe({
      next: (res:any)=>
      {
        Swal.fire({
          icon:'success',
          title: res.message,
          confirmButtonColor: '#28B463'
        });
        this.getServices();
        if(this.showTableServices)
        {
          this.showButtonActions(this.serviceUpdate._id,false)
        }
      },
      error: (err)=>
      {
        Swal.fire({
          icon: 'error',
          title: err.error.message || err.error,
          confirmButtonColor: '#E74C3C'
        });
      },
    })
  }

  deleteService(id: string)
  {
    Swal.fire({
      title: 'Do you want to delete this Service?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't delete`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.serviceRest.deleteService(id).subscribe({
          next: (res: any) => {
            Swal.fire({
              title: res.message,
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 2000
            });
            this.getServices();
            if(this.showTableServices)
            {
              this.showButtonActions(id,false)
            }
          },
          error: (err) => Swal.fire({
            title: err.error.message,
            icon: 'error',
            position: 'center',
            timer: 3000
          })
        })
        this.getServices();
      } else if (result.isDenied)
      {
        Swal.fire('Service Not Deleted','', 'info')
      }
    })
  }

  showTable()
  {
    this.showTableServices =! this.showTableServices;
    for(let service of this.services)
    {
      service.checked = true
    }
  }


  showButtonActions(serviceID:any, check:any)
  {
    this.controloClick += 1
    let controlCheck =! check.checked
    if(this.controloClick == 1)
    {
      for(let service of this.services)
      {
        if(serviceID != service._id)
        {
          service.checked =! controlCheck
        }
        else if(serviceID == service._id)
        {
          service.checked = controlCheck
        }
      }
    }
    else if(this.controloClick == 2)
    {
      for(let service of this.services)
      {
        service.checked = true;
      }
      this.controloClick = 0;
    }
    this.buttonActions =! this.buttonActions;
  }
}
