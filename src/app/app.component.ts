import { Component, OnInit } from '@angular/core'
import { TasksService } from './http/service/tasks'
import { Task } from './model/model'
export interface Tasks {
  id: number
  description: string
  active: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  newTask: string = ''
  tasks: Tasks[] = [{ id: 1, description: 'nova tarefa de inicio', active: false }]
  editTask: object = {}

  taskObj: Task = new Task()
  taskArr: Task[] = []
  modal: boolean = false
  alertConfirm: boolean = false
  alert: { msg: string; type: string; active: boolean } = { msg: '', type: '', active: false }

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.alert
    this.newTask = ''
    this.taskObj = new Task()
    this.taskArr = []
    this.getTasks()
  }

  openModal(val: object) {
    this.editTask = { ...val }
    this.modal = true
  }

  closeModal(val: boolean) {
    this.modal = val
    this.alertConfirm = val
  }

  openAlert(txt: string, type: string) {
    const _this = this
    this.alert.active = true
    this.alert.msg = txt
    this.alert.type = type
    window.setTimeout(function () {
      _this.alert.active = false
    }, 5000)
  }

  openConfirm(task: Task) {
    this.alertConfirm = true
    this.openModal(task)
  }

  getTasks() {
    this.tasksService.getAllTask().subscribe(
      (res) => {
        this.tasks = res
      },
      (err) => {
        const txt: string = 'Ocorreu um erro contact o suporte tecnico: 0800'
        const type: string = 'error'
        this.openAlert(txt, type)
      }
    )
  }

  addTask() {
    if (this.newTask !== '') {
      this.taskObj.description = this.newTask
      this.tasksService.addTasks(this.taskObj).subscribe(
        (res) => {
          this.ngOnInit()

          const txt: string = 'Tarefa adicionada com sucesso!'
          const type: string = 'success'
          this.openAlert(txt, type)

          this.newTask = ''
        },
        (err) => {
          alert(err)
        }
      )
    } else {
      const txt: string = 'empty field! :( '
      const type: string = 'error'
      this.openAlert(txt, type)
    }
  }

  deleteTask(task: any) {
    if (!task.ok) {
      this.modal = false
      this.tasksService.deleteTask(task.task).subscribe(
        (res) => {
          this.ngOnInit()
          const txt: string = 'task deleted'
          const type: string = 'success'
          this.openAlert(txt, type)
        },
        (err) => {
          const txt: string = 'Failed to delete task'
          const type: string = 'error'
          this.openAlert(txt, type)
        }
      )
    }
  }

  updatetask(task: any) {
    this.tasksService.editTask(task.task).subscribe(
      (res) => {
        this.ngOnInit()
        const txt: string = 'task edited'
        const type: string = 'success'
        this.openAlert(txt, type)
        this.modal = false
      },
      (err) => {
        const txt: string = 'Failed to edit task'
        const type: string = 'error'
        this.openAlert(txt, type)
      }
    )
  }

  taskChecked(val: any) {
    const index = this.tasks.findIndex((item) => item.id === val.id)
    this.tasks[index].active = true
    this.tasksService.editTask(this.tasks[index]).subscribe(
      (res) => {
        const txt: string = 'task completed'
        const type: string = 'success'
        this.openAlert(txt, type)
      },
      (err) => {
        const txt: string = 'There was an error contacting technical support: 0800'
        const type: string = 'error'
        this.openAlert(txt, type)
      }
    )
  }
}
