<script setup>
    import {useModalStore} from "@/store/modalStore";
    import ColumnTask from "@/components/TableColumn/ColumnTask/ColumnTask.vue";

    const props = defineProps({
        title: String,
        data: Array
    })
    const modal = useModalStore()
    const openModal = () => {
        modal.setColumn(props.title)
        modal.toggleModal()
    }
</script>

<template>
  <div class="column">
      <div class="columnHeader">{{ title }}</div>
      <div @dragover.prevent @dragenter.prevent @drop="$emit('taskDrop', $event, title)" class="columnBody">
          <div class="columnTasks">
              <ColumnTask draggable="true" @dragstart="$emit('taskDrag', $event, task)" v-for="task in data" :task="task"/>
          </div>
          <button @click="openModal" class="createTask">Добавить задачу</button>
      </div>
  </div>
</template>

<style scoped>
.column {
    min-width: 170px;
    width: 20%;
    border: 1px solid #f8f8f8;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
}

.columnHeader {
    padding: 12px 0;
    text-align: center;
    background: #2c3e50;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid var(--vt-c-white-soft);
}

.columnBody {
    height: 100%;
    flex-direction: column;
    display: flex;
    justify-content: space-between;
    padding: 20px 12px;
}

.columnTasks {
    height: auto;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
}

.createTask {
    padding: 12px 0;
    width: calc(100% - 8px);
    margin: 0 4px;
    border-radius: 12px;
    border: 1px solid #f8f8f8;
    background: var(--color-background);
    color: var(--color-text);
    cursor: pointer;
}
.createTask:hover {
    border-color: #2c3e50;
    transition: all .3s ease-out;
}
</style>