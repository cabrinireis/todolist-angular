import { Component, OnInit } from '@angular/core';
import axios from 'axios'
import { TasksService } from './http/service/tasks'
import { Task} from './model/model'
export interface Tasks {
  id: number;
  description: string;
  active: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  newTask: string = ''
  tasks: Tasks[] = [{ id: 1, description: 'nova tarefa de inicio', active: false}]
  editTask: object = {};
  
  taskObj : Task = new Task();
  taskArr : Task[] = [];
  modal: boolean = false


  constructor(private tasksService : TasksService) { }

  ngOnInit(): void {
    this.newTask = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getTasks()
  }

  openModal(val: object) {
    this.editTask = {...val}
    this.modal = true
  }

  addItem(val: boolean) {
    this.modal = val
    this.ngOnInit()
  }

  taskChecked(val: any){
    const index = this.tasks.findIndex(item => item.id === val.id)
    this.tasks[index].active = true

  }

  getTasks() {
    this.tasksService.getAllTask().subscribe(res => {
      this.tasks = res
    }, err => {
      alert("Unable to get list of tasks");
    });
    // axios.get('http://localhost:3000/tasks')
    // .then(res => {
    //  console.log(res.data)
    //  this.tasks = res.data
    // })
  }

  addTask() {
    this.taskObj.description = this.newTask;
    this.taskObj.active = true
    this.tasksService.addTasks(this.taskObj).subscribe(res => {
      this.ngOnInit();
      this.newTask = '';
    }, err => {
      alert(err);
    })
  }

  deleteTask(etask : Task) {
    console.log(etask)
    this.tasksService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }
  

  // addTask() { 
  //   if(this.newTask) {
  //     let task: {id: number, description: string, active: boolean} = {
  //       id: 2,
  //       description: this.newTask,
  //       active: false,
  //     }
  //     axios.post('http://localhost:3000/tasks',task)
  //     .then(res => {
  //      console.log(res.data)
  //      this.tasks = res.data
  //     })
  //     this.tasks.push(task)
      
  //     // reset
  //     this.newTask = ''
  //   }
  // }
}
