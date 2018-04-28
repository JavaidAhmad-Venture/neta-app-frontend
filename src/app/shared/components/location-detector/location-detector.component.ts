import { HelperService } from './../../services/helper.service';
import { CookieService } from './../../services/cookie.service';
import { LocationService } from './../../services/location.service';
import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';


@Component({
  selector: 'location-detector',
  templateUrl: './location-detector.component.html'
})
export class LocationDetectorComponent implements OnInit {
  loading = false;
  states: any[] = [];
  parliaments: any[] = [];
  assemblies: any[] = [];
  selectedState: string = '';

  selectedCons: string = '';
  selectedDistrict: string = '';
  parliamentId: string = '';
  assemblyId: string = '';
  //for two binding
  stateId:any;
  state: any;
  parliament: any;
  assembly: any;
  @Output("ids") C_ID = new EventEmitter<{}>();

  constructor(private locationService: LocationService,
    private helperService: HelperService,
    private cookies: CookieService) { }

  ngOnInit() {
    this.locationService.getStates()
      .subscribe(res => {
        this.states = res.data;
      });
  }

  showData(res) {
    this.loading = false;
    let address = res.data;
    console.log("Auqibresponse",res);
    let curParliament = this.findObjectByKey(address.parliament, 'id', address.selected.parliamentary_id);
    let curConstituency = this.findObjectByKey(curParliament.assembly, 'id', address.selected.assembly_id);
    console.log("helllo", curParliament);

    this.stateId=address.id;
    this.selectedState = address.name;
    this.selectedDistrict = curParliament.name;
    this.selectedCons = curConstituency.name;
    this.parliamentId = curParliament.id;
    this.assemblyId = curConstituency.id;
    //this.states.push({ name: address.name, id: address.id,isSelected:true });
    this.parliaments.push({ name: curParliament.name, id: curParliament.id, isSelected: true });
    this.assemblies.push({ name: curConstituency.name, id: curConstituency.id, isSelected: true });
  }
  findObjectByKey(array, key, value) {
    for (let o of array) {
      if (o[key] === value)
        return o;
    }
    return null;
  }
  onNext() {
    this.C_ID.emit({
      id:this.stateId,
      d_id: this.parliamentId,
      d_name: this.selectedDistrict,
      a_id: this.assemblyId,
      a_name: this.selectedCons,
    });//send cons and assembly id to parent component;
    // this.helperService.setObservable("Apple");
    this.helperService.setEmitter({
      type: 'location',
      data: {
        id:this.stateId,
        state: this.selectedState,
        d_id: this.parliamentId,
        d_name: this.selectedDistrict,
        a_id: this.assemblyId,
        a_name: this.selectedCons,
      }
    })
  }


  getParliament(a) {
    console.log("option sected", a);
    this.locationService.getParliament(a).subscribe(res => {
      console.log(res.data.parliament);//got constituencies
      this.parliaments = res.data.parliament;
      console.log('parliaments', this.parliaments);
    })
  }
  selectedConstituency(id) {

    console.log("i am selected option", id);
    //  this.Address.getAssemblies();
  }
  getAssemblies(id) {
    console.log('district id', id);
    this.parliaments.forEach(element => {
      if (element.id === id) {
        this.assemblies = element.assembly;
      }
    })
    console.log('assemblies:', this.assemblies);


  }

  getLocation() {//auqib//it gets lat lng 
    this.loading = true;
    this.selectedState = '';
    this.selectedDistrict = '';
    this.selectedCons = '';

    let lat = this.cookies.readCookie('lat');
    let lng = this.cookies.readCookie('lng');
    if (lat && lng)//if lat lng available then get current address
    {
      this.locationService.getCurrentAddress(lat, lng)
        .subscribe(res => { this.showData(res) });
    }
    else if (window.navigator && window.navigator.geolocation) { //else then fetch lat long first
      this.loading = true;
      window.navigator.geolocation.getCurrentPosition(
        position => {
          //console.log('Position before lat and long:', position);
          this.cookies.createCookie('lat', position.coords.latitude, null, null);
          this.cookies.createCookie('lng', position.coords.longitude, null, null);

          this.locationService.getCurrentAddress(position.coords.latitude, position.coords.longitude)
            .subscribe(res => { this.showData(res) });
        },
        error => {
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              break;
            case 2:
              console.log('Position Unavailable');
              break;
            case 3:
              console.log('Timeout');
              break;

          }
          this.loading = false;
        }
      );
    };
  }
  onChangeState(e) {
    //this.parliamentId = e.id;
    this.stateId=e.id;
    console.log("stateId",e.id);
    this.assemblies = [];
    this.getParliament(e.id);
    this.selectedState=e.name;
    console.log("on change state",e);

  }
  onChangeParliament(e) {//auqib
    this.parliamentId = e.id,
      this.selectedDistrict = e.name,
      console.log("this is my Assembly", e);
    this.getAssemblies(e.id);
  }
  onChangeAssembly(e) {//Auqib
    this.assemblyId = e.id;
    this.selectedCons = e.name;

  }

}


