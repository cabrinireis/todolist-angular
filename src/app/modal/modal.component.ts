import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import axios from 'axios'
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() newItemEvent = new EventEmitter<boolean>()

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  updatetask(val: any) {
    axios.put('http://localhost:3000/tasks/'+ val.id, val)
    .then(res => {
      console.log(res)
    })
  }

  @Input()  data: any
  @Input()  active: boolean = false
}
