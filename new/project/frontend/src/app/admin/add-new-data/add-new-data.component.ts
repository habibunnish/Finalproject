import { AdminDetailsService } from './../../service/admin-details.service';
import { ProductDetailsService } from './../../service/product-details.service';
import { CityDetailsService } from './../../service/city-details.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-new-data',
  templateUrl: './add-new-data.component.html',
  styleUrls: ['./add-new-data.component.scss'],
})
export class AddNewDataComponent implements OnInit {
  base64String : any
  location: any
  file: any;
  id: any;
  chosenMod: any;
  base:any;
  @Output()
  change = new EventEmitter();

  locations = [
    { name: 'Chennai' },
    { name: 'goa' },
    { name: 'Banguluru' },
    { name: 'Jammu' },
  ];

  roomDetails = {
    _id:'',
    tittle: '',
    area: '',
    price: '',
    image: '',
    location: '',
    locations:'',
    quantity:'',
    base64String:''
  };
  selectedLocation: string=""
  selectedImage: string=""

  constructor(
    private http: HttpClient,
    private router: Router,
    private city: CityDetailsService,
    private product:ProductDetailsService,
    private activatedRoute: ActivatedRoute,
    private admin:AdminDetailsService
    
  ) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id']; 
    if (this.id != 0) this.GetEdits();
    
  }
  GetEdits() {
    this.product.getEdit(this.id).subscribe((data) => {
      console.log(data);
      this.roomDetails = data;
      this.selectedLocation = this.roomDetails.location;
       this.selectedImage=this.roomDetails.image
      });
  }

  adding(roomDetails: any) {
    roomDetails.image = this.file.name;
    this.addNewProduct(roomDetails);
    this.addProduct(roomDetails);
  }

  /*@post*/
  addNewProduct(roomDetails: any) {
    console.log(this.location);
    roomDetails.location = this.location;
    roomDetails.base64String = this.base64String;
    if (this.location == 'Chennai') {
      this.city.addProductsDetails(roomDetails).subscribe((res) => {
        console.log(res);
      });
    } else if (this.location == 'Banguluru') {
      this.city
        .addProductsDetailsBangluru(roomDetails)
        .subscribe((res) => {
          console.log(res);
        });
    } else if (this.location == 'goa') {
      this.city
        .addProductsDetailsRoyapuram(roomDetails)
        .subscribe((res) => {
          console.log(res);
        });
    } else if (this.location == 'Jammu') {
      this.city
        .addProductsDetailsJammu(roomDetails)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  changeDone(a: any) {
    console.log('method is run');
    console.log(a);
    this.location = a;
    console.log(this.location);
  }
  modo($event: any) {
    console.log('changing', $event.target.value);
    this.changeDone($event.target.value);
  }


  addProduct(roomDetails: any) {
    console.log('addproduct method calling');
    roomDetails.locations = JSON.stringify(this.locations);
    console.log(roomDetails.locations);
    this.roomDetails.base64String = this.base64String;
    console.log('Testtttt',roomDetails );
    this.product.addProductDetails(roomDetails).subscribe((data) => {
      console.log(data);
      roomDetails=data
      // this.roomDetails.base64String = this.base64String;
    
      alert('product added successfully');
      this.router.navigate(["get-product"])
    });
  }

  putting() {
    this.updatePutProduct();
  }

  updatePutProduct() {
    console.log(this.roomDetails, this.roomDetails._id);
    console.log(this.roomDetails);
    this.product.putProduct(this.roomDetails._id, this.roomDetails).subscribe((data: any) => {
        console.log(data);
        alert('product edited successfully');
        this.router.navigate(["get-product"])
      });
  }

  deleteData(data: any) {
    console.log('delete data() calling ', data.id);
    this.product.deleteProductChennai(data._id).subscribe((res) => {
      console.log(res);
    });
    alert('deleted this details');
  }
  
  getFile(event: any) {
    this.file = event.target.files[0];
    if(this.file){
      const reader:FileReader=new FileReader();
      reader.onload=(e:any)=>{
        this.base64String=e.target.result;
        console.log(this.base64String);
      };
      reader.readAsDataURL(this.file)
    }
    console.log('file', this.file.name);
    
    this.roomDetails.image = this.file.name;
    this.selectedImage=this.roomDetails.image
    console.log('getfile');
  }

  submitData() {
    console.log("submit")
    let formData = new FormData();
    formData.set('file',this.base64String,this.file.name);
    console.log('formData',this.file,this.file.name)
  
    // this.http.post('http://localhost:8080/api/product', formData).subscribe((res) => {
    //   console.log(res);
    // });
   
  //get method:-
     this.admin.photo(formData).subscribe((res)=>{
       console.log(res);
     });

  }
  checkPage() {
    this.router.navigate(['get-product']);
  }
}
