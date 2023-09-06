import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-swalmessage',
  templateUrl: './swalmessage.component.html',
  styleUrls: ['./swalmessage.component.scss']
})
export class SwalmessageComponent {

  swalInfoMessage(swalTitle:any)
{
  Swal.fire({
    title:swalTitle,
    icon: 'info',
    confirmButtonColor: '#364574',
    allowOutsideClick: false,
    allowEscapeKey: false
    
  });
}


swalWarningMessage(swalTitle:any)
{
  Swal.fire({
    title:swalTitle,
    icon: 'warning',
    confirmButtonColor: '#364574',
    allowOutsideClick: false,
    allowEscapeKey: false
    
  });
}

swalErrorMessage(swalTitle:any)
{
  Swal.fire({
    title:swalTitle,
    icon: 'error',
    confirmButtonColor: '#364574',
    allowOutsideClick: false,
    allowEscapeKey: false
    
  });
}

}
