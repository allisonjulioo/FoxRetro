import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from '../../utils/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private modalService: NgbModal) { }

  public open(message) {
    const modalRef = this.modalService.open(ConfirmComponent, { centered: true, windowClass: 'animated tada faster', size: 'sm' });
    modalRef.componentInstance.message = message;
    return modalRef.result
  }
}
