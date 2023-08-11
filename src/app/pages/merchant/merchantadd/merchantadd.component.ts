import { Component } from '@angular/core';

@Component({
  selector: 'app-merchantadd',
  templateUrl: './merchantadd.component.html',
  styleUrls: ['./merchantadd.component.scss']
})
export class MerchantaddComponent {

  ngOnInit(): void {
  }


  fieldTextType1!: boolean;
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];
  
}
