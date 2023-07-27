import {defineStore} from "pinia";

export const useSidebarStore = defineStore("SidebarStore", {
    state: () => {
        return {
            isOpen: false,
            column: '',
            taskName: '',
            taskDescription: '',
            taskExecutor: '',
            taskDate: Date
        }
    },
    actions: {
        toggleSidebar() {
            this.isOpen = !this.isOpen
        },
        setTask(task) {
            this.taskDescription = task.taskDescription
            this.column = task.column
            this.taskName = task.taskName
            this.taskExecutor = task.taskExecutor
            this.taskDate = task.taskDate
        },
        setColumn(column) {
            this.column = column
        }
    }
})