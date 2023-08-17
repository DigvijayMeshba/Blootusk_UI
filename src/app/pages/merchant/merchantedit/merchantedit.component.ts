import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-merchantedit',
  templateUrl: './merchantedit.component.html',
  styleUrls: ['./merchantedit.component.scss']
})
export class MerchanteditComponent {

  showDiv = {
    inputs : false,
    buttons : false
  }

  constructor(private modalService: NgbModal) { }

  activeTab = 1;

  fieldTextType1!: boolean;
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1;
  }

  selectedAccount = 'Select';
  Default = [
    { name: 'Data 1' },
    { name: 'Data 2' },
  ];

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }
}
