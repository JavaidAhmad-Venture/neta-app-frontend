import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { element } from 'protractor';

import { LocationService } from '../../../../shared/services/location.service';

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
  state:any;
  parliament:any;
  assembly:any;
  @Output("ids") C_ID = new EventEmitter<{}>();

  constructor(private locationService: LocationService) { }

  ngOnInit() {
    this.locationService.getStates()
      .subscribe(res => {
        this.states = res.data;
      });
  }

  showData(res) {
    this.loading = false;
    let address = res.data;

    let curParliament = this.findObjectByKey(address.parliament, 'id', address.selected.parliamentary_id);
    let curConstituency = this.findObjectByKey(curParliament.assembly, 'id', address.selected.assembly_id);
    console.log(curParliament);


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
    this.C_ID.emit({ c_id: this.parliamentId, a_id: this.assemblyId });//send cons and assembly id to parent component;
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

  getLocation() {
    this.loading = true;
    this.selectedState = '';
    this.selectedDistrict = '';
    this.selectedCons = '';
    if (window.navigator && window.navigator.geolocation) {
      this.loading = true;
      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log('Position before lat and long:', position);
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
    this.parliamentId = e.id;
    this.assemblies = [];
    this.getParliament(e.id);

  }
  onChangeParliament(e) {
    this.assemblyId = e.id;
    this.getAssemblies(e.id);
  }

}


