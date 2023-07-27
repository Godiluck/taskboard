<script setup>
import {useModalStore} from "@/store/modalStore";
import {columns, names} from "@/utils/consts";

const modal = useModalStore()
</script>

<template>
  <div class="overlay" @click="modal.toggleModal()"/>
  <div class="modal">
      <p style="font-size: 24px">Добавить задачу</p>
      <div class="inputBlock">
          <div class="inputWrapper">
              <p>Исполнитель:</p>
              <select v-model="modal.taskExecutor" class="input" name="executor" id="executor">
                  <option v-for="name in names" :key="name">
                      {{ name }}
                  </option>
              </select>
          </div>
          <div class="inputWrapper">
              <p>Раздел:</p>
              <select v-model="modal.column" class="input" name="column" id="column">
                  <option v-for="column in columns" :key="column">
                      {{ column }}
                  </option>
              </select>
          </div>
          <div class="inputWrapper">
              <p>Название задачи:</p>
              <input v-model="modal.taskName" class="input" type="text" placeholder="Например: Багфикс">
          </div>
          <div class="inputWrapper">
              <p>Описание задачи:</p>
              <input v-model="modal.taskDescription" class="input" type="text" placeholder="Например: Ошибка при клике на...">
          </div>
      </div>
      <div class="buttonsBlock">
          <button @click="$emit('addTask')" class="button confirm">Сохранить</button>
          <button @click="modal.toggleModal()" class="button close">Отмена</button>
      </div>
  </div>
</template>

<style scoped>
.overlay {
    z-index: 100;
    background: rgba(0,0,0,.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}
.modal {
    z-index: 101;
    width: 50vw;
    min-height: 250px;
    background: var(--color-background);
    border-radius: 12px;
    padding: 12px 24px;
    border: 1px solid var(--vt-c-white-soft);
    position: absolute;
    left: 0;
    right: 0;
    margin: 100px auto;
}
.inputWrapper {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
}
.inputBlock {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;
}
.input {
    outline: none;
    height: 40px;
    border-radius: 12px;
    padding: 0 12px;
    border: 1px solid var(--color-background);
}
.buttonsBlock {
    display: flex;
    justify-content: space-around;
    margin: 40px 0 12px 0;
}
.button {
    border-radius: 12px;
    padding: 12px 0;
    width: 30%;
    cursor: pointer;
    border: 1px solid var(--color-background);
    color: #f8f8f8;
    transition: all .3s ease-out;
}
.confirm {
    background: #2c3e50;
}
.confirm:hover {
    background: #1a3754;
}
.close {
    background: #ff0000;
}
.close:hover {
    background: #cc0000;
}
</style>