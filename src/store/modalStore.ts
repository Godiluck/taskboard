import {defineStore} from "pinia";

export const useModalStore = defineStore("ModalStore", {
    state: () => {
        return {
            isOpen: false,
            column: '',
            taskName: '',
            taskDescription: '',
            taskExecutor: '',
            taskDate: ''
        }
    },
    actions: {
        toggleModal() {
            this.isOpen = !this.isOpen
            if (this.isOpen === false) {
                this.column = ''
                this.taskName = ''
                this.taskDescription = ''
                this.taskExecutor = ''
            }
        },
        setDate() {
            this.taskDate = new Date().toLocaleString()
        },
        setColumn(column) {
            this.column = column
        }
    }
})