import { CondidatesService } from './../../../shared/services/condidates.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  candidates:any=[];
  constructor(private candidateService:CondidatesService) { }

  ngOnInit() {
    // this.candidateService.getAllCandidates().subscribe(data=>{
    //     this.candidates = data.json().data; 
    //     console.log(this.candidates);
    // })
  }

}
