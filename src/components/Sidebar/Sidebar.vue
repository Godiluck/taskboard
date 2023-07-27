<script setup>
import {useSidebarStore} from "@/store/sidebarStore";
import {columns, names} from "@/utils/consts";

const sidebar = useSidebarStore()
</script>

<template>
    <div v-if="sidebar.isOpen" @click="sidebar.toggleSidebar()" class="overlay"/>
    <div class="sidebarWrapper" :style="sidebar.isOpen ? { right: 0 } : ''">
        <p style="font-size: 24px">Редактирование</p>
        <div class="inputBlock">
            <div class="inputWrapper">
                <p>Исполнитель:</p>
                <select v-model="sidebar.taskExecutor" class="input" name="executor" id="executor">
                    <option v-for="name in names" :key="name">
                        {{ name }}
                    </option>
                </select>
            </div>
            <div class="inputWrapper">
                <p>Раздел:</p>
                <select v-model="sidebar.column" class="input" name="column" id="column">
                    <option v-for="column in columns" :key="column">
                        {{ column }}
                    </option>
                </select>
            </div>
            <div class="inputWrapper">
                <p>Название задачи:</p>
                <input v-model="sidebar.taskName" class="input" type="text" placeholder="Например: Багфикс">
            </div>
            <div class="inputWrapper">
                <p>Описание задачи:</p>
                <input v-model="sidebar.taskDescription" class="input" type="text" placeholder="Например: Ошибка при клике на...">
            </div>
        </div>
        <p class="dateRow">Создана: {{ sidebar.taskDate }}</p>
        <div class="buttonsBlock">
            <button @click="$emit('updateTask')" class="button confirm">Сохранить</button>
            <button @click="sidebar.toggleSidebar()" class="button close">Отмена</button>
            <button @click="$emit('deleteTask')" class="button delete">Удалить</button>
        </div>
    </div>
</template>

<style scoped>
.overlay {
    z-index: 100;
    background: rgba(0, 0, 0, .5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
}

.sidebarWrapper {
    top: 0;
    z-index: 101;
    width: 320px;
    height: 100vh;
    position: fixed;
    right: -320px;
    transition: all .3s ease-out;
    background: var(--color-background);
    padding: 12px 24px;
    border-left: 1px solid var(--vt-c-white-soft);
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
.dateRow {
    margin-top: 20px;
}
.buttonsBlock {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 20px 0 12px 0;
}
.button {
    border-radius: 12px;
    padding: 12px 0;
    width: 45%;
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
.delete {
    margin-top: 10px;
    background: #f8f8f8;
    color: #181818;
}
.delete:hover {
    background: #181818;
    color: #f8f8f8;
}
</style>