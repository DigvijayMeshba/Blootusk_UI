import { Component } from '@angular/core';

@Component({
  selector: 'app-rewardpointlist',
  templateUrl: './rewardpointlist.component.html',
  styleUrls: ['./rewardpointlist.component.scss']
})
export class RewardpointlistComponent {


  TransactionTypeLists = [   
    { name: 'Signup', id:'SU' },
    { name: 'Refferal', id:'RE' },
    { name: 'Redeem', id:'RD' },
  ];
}
