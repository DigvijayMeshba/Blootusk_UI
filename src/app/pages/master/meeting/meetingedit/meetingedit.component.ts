import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meetingedit',
  templateUrl: './meetingedit.component.html',
  styleUrls: ['./meetingedit.component.scss']
})
export class MeetingeditComponent implements OnInit{
  activeTab = 1;
  addAgendaDiv: boolean = false;

  
  addAgenda() {
    this.addAgendaDiv = true;
  }

  removeAgenda(){
    this.addAgendaDiv = false;
  }

  signDirector = 'Select Director';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

  multiDefaultOption = 'Director';
  selectValue = ['Data 1', 'Data 2'];

  constructor() { }

  ngOnInit(): void {
    
  }
}
