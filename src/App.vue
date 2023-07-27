<script setup>
import TableColumn from "@/components/TableColumn/TableColumn.vue";
import {columns} from "@/utils/consts";
import {useModalStore} from "@/store/modalStore";
import AddTask from "@/components/AddTask/AddTask.vue";
import {ref, watch} from "vue";
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import {useSidebarStore} from "@/store/sidebarStore";

const modal = useModalStore()
const sidebarStore = useSidebarStore()
let indexedDB
let db
let data
let filteredData
const isLoading = ref(true)
const initBase = () => {
    isLoading.value = true
    indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    const request = indexedDB.open("TestBase", 1)
    request.onerror = () => {
        alert("Ошибка работы с базой")
    }
    request.onupgradeneeded = () => {
        const db = request.result
        db.createObjectStore('tasks', {keyPath: "taskDate"})
    }
    request.onsuccess = () => {
        db = request.result
        const transaction = db.transaction("tasks", 'readwrite')
        const objectStore = transaction.objectStore("tasks")
        const req = objectStore.getAll()
        req.onsuccess = () => {
            data = req.result
            isLoading.value = false
        }
    }
    return request
}
const addTask = async (isUpdate = false, isDelete = false, drag = false) => {
    const useStore = isUpdate ? sidebarStore : modal
    if (indexedDB) {
        if (useStore.taskExecutor === "") {
            alert("Поле исполнитель должно быть заполнено")
            return;
        }
        if (useStore.column === "") {
            alert("Поле раздел должно быть заполнено")
            return;
        }
        if (useStore.taskName === "") {
            alert("Поле название должно быть заполнено")
            return
        }
        isLoading.value = true
        if (!isUpdate) {
            modal.setDate()
        }
        const taskData = {
            column: useStore.column,
            taskName: useStore.taskName,
            taskDescription: useStore.taskDescription,
            taskExecutor: useStore.taskExecutor,
            taskDate: useStore.taskDate
        }
        const transaction = db.transaction("tasks", 'readwrite')
        const objectStore = transaction.objectStore("tasks")
        let post
        if (isUpdate) {
            if (isDelete) {
                post = objectStore.delete(useStore.taskDate)
            } else {
                post = objectStore.put(taskData)
            }
        } else {
            post = objectStore.add(taskData)
        }
        post.onsuccess = () => {
            const req = objectStore.getAll()
            req.onsuccess = () => {
                data = req.result
                if (!drag) {
                    isUpdate ? sidebarStore.toggleSidebar() : modal.toggleModal()
                }
                isLoading.value = false
            }
        }
        post.onerror = () => {
            alert("Что-то пошло не так")
        }
        return;
    }
    alert("Ошибка работы с базой")
}
const sortByField = (arr, field) => {
    const result = arr.filter((item) => {
        return item.column === field
    })
    result.sort((a, b) => a.taskDate > b.taskDate ? -1 : +1)
    return result
}
const onDragStart = (e, item) => {
    console.log(item)
    sidebarStore.setTask(item)
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.effectAllowed = "move"
}
const onDrop = (e, column) => {
    sidebarStore.setColumn(column)
    addTask(true, false, true)
}
initBase()
watch(isLoading, () => {
    if (isLoading.value === false && data.length !== 0) {
        console.log(sortByField(data, columns.sprint))
    }
})
</script>

<template>
    <div class="wrapper">
        <TableColumn @taskDrag="onDragStart" @taskDrop="onDrop" v-if="isLoading === false" v-for="column in columns"
                     :key="column" :title="column" :data="sortByField(data, column)"/>
        <AddTask @addTask="addTask" v-if="modal.isOpen" :key="modal.isOpen"/>
    </div>
    <Sidebar @deleteTask="addTask(true, true)" @updateTask="addTask(true)"/>
</template>

<style scoped>
.wrapper {
    position: relative;
    padding: 20px 0;
    width: 100%;
    height: calc(100vh - 40px);
    display: flex;
    justify-content: center;
    flex-direction: row;
    column-gap: 20px;
}
</style>
