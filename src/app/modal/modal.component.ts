import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  ngOnInit(): void {}

  @Output() closeModal = new EventEmitter<boolean>()
  @Output() confirmed = new EventEmitter<object>()
  @Output() edited = new EventEmitter<object>()

  close(value: boolean) {
    this.closeModal.emit(value)
  }
  ok(task: object, ok: boolean) {
    this.confirmed.emit({ task, ok })
  }
  updated(task: object, ok: boolean) {
    this.edited.emit({ task, ok })
  }

  @Input() data: any
  @Input() confirm: boolean = false
  @Input() active: boolean = false
}
