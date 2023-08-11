import { Component } from '@angular/core';

@Component({
  selector: 'app-signupmerchant',
  templateUrl: './signupmerchant.component.html',
  styleUrls: ['./signupmerchant.component.scss']
})
export class SignupmerchantComponent {

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
