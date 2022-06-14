import { Component, OnInit } from '@angular/core';
import axios from 'axios'
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
  modal: boolean = false

  ngOnInit(): void {
    this.getTasks()
  }

  openModal(val: object) {
    this.editTask = {...val}
    this.modal = true
  }

  addItem(val: boolean) {
    this.modal = val
  }

  taskChecked(val: any){
    const index = this.tasks.findIndex(item => item.id === val.id)
    this.tasks[index].active = true

  }

  getTasks() {
    axios.get('http://localhost:3000/tasks')
    .then(res => {
     console.log(res.data)
     this.tasks = res.data
    })
  }

  addTask() { 
    if(this.newTask) {
      let task: {id: number, description: string, active: boolean} = {
        id: 2,
        description: this.newTask,
        active: false,
      }
      axios.post('http://localhost:3000/tasks',task)
      .then(res => {
       console.log(res.data)
       this.tasks = res.data
      })
      this.tasks.push(task)
      
      // reset
      this.newTask = ''
    }
  }
}
