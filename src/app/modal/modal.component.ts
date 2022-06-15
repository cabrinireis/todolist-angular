import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import axios from 'axios'
import { TasksService } from '../http/service/tasks'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(private tasksService : TasksService) { }


  ngOnInit(): void {
  }

  @Output() newItemEvent = new EventEmitter<boolean>()

  addNewItem(value: boolean) {
    this.newItemEvent.emit(value);
  }

  updatetask(val: any) {
    // this.taskObj.task_name = this.addTaskValue;
    this.tasksService.editTask(val).subscribe(res => {
      console.log(res)
      this.newItemEvent.emit(false);
      // this.addTaskValue = '';
    }, err => {
      alert(err);
    })
    // axios.put('http://localhost:3000/tasks/'+ val.id, val)
    // .then(res => {
    //   console.log(res)
    // })
  }


 

  @Input()  data: any
  @Input()  active: boolean = false
}
