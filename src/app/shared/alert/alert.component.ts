import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
 
 
//public messageContent! : string;
@Input() messageContent: string | undefined;
 


  @Input() isVisibleSuccess: boolean = false;
  @Input() isVisibleDanger: boolean = false;
  @Input() isVisibleWarning: boolean = false;
 // @Input() messageContent: string | undefined;

  closeSuccessAlert() {
    this.isVisibleSuccess = false;
  }

  closeDangerAlert() {
    this.isVisibleDanger = false;
  }

  closeWarningAlert() {
    this.isVisibleWarning = false;
  }


  
}
