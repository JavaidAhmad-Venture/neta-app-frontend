import { CondidatesService } from './../../../shared/services/condidates.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  id = 'chart1';
  width = 600;
  height = 400;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = 'Angular4 FusionCharts Sample';
  constructor() {
    this.dataSource ={
      type: "maps/india",
      renderAt: "indian-map", // div container for our map
      height: "650",
      width: "100%",
      dataFormat: "json",
      dataSource: {
        "chart": {
          "caption": "No. of Computers with Internet in India",
          "subCaption": "Census 2011",
          "captionFontSize": "25",
          // other chart configurations
        },
  
        "colorrange": {
          "minvalue": "300",
          "startlabel": "Low",
          "endlabel": "High",
          "code": "#efedf5",
          "gradient": "1",
          "color": [{
            "maxvalue": "220000",
            "displayvalue": "Avg.",
            "code": "#bcbddc"
          }, {
            "maxvalue": "1400000",
            "code": "#756bb1"
          }]
        },
  
        "data": [{
            "id": "015",
            "value": "58438"
          }, {
            "id": "014",
            "value": "41344"
          }, {
            "id": "028",
            "value": "292124"
          },
          // more data
        ]
      }
    } // render method 
  
   }

  ngOnInit() {
   
  }

}
