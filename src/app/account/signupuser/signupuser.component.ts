import { Component } from '@angular/core';

@Component({
  selector: 'app-signupuser',
  templateUrl: './signupuser.component.html',
  styleUrls: ['./signupuser.component.scss']
})
export class SignupuserComponent {

  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

  showDiv = {
    current : true,
    next : false
  }
  
}
