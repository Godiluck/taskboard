<script setup>
import {useSidebarStore} from "@/store/sidebarStore";

const sidebar = useSidebarStore()
 const props = defineProps({
     task: Object
 })
 const { taskName, taskDate, taskExecutor } = props.task
const openSidebar = () => {
    sidebar.setTask(props.task)
    sidebar.toggleSidebar()
}
</script>

<template>
  <div class="taskWrapper" @click="openSidebar">
      <p class="taskTitle">{{ taskName }}</p>
      <p class="taskRow">Исполнитель: {{ taskExecutor }}</p>
      <p class="taskRow">Создана: {{ taskDate }}</p>
  </div>
</template>

<style scoped>
.taskWrapper {
    width: calc(100% - 8px);
    padding: 12px 0;
    border-radius: 12px;
    border: 1px solid #f8f8f8;
    display: flex;
    align-items: center;
    row-gap: 8px;
    flex-direction: column;
    cursor: pointer;
}

.taskTitle {
    padding: 0 8px 2px 8px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 20px;
    white-space: normal;
    overflow: hidden;
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
}

.taskWrapper:hover {
    border-color: #2c3e50;
    transition: all .3s ease-out;
    .taskTitle {
        border-color: #2c3e50;
        transition: all .3s ease-out;
    }
}

.taskRow {
    padding: 0 8px;
    text-align: start;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
}
</style>