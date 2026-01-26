<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { removeToken } from '../../utils/helper'

const router = useRouter()
const isOpen = ref(false)

const Handleopen = () => {
    isOpen.value = !isOpen.value
}

const LogOut = () => {
    removeToken(),
        router.push("/login")
}

</script>

<template>
    <!-- Large -->
    <div
        class="lg:flex hidden fixed top-0 left-0 h-screen bg-blue-600 flex-col h-screen w-1/6 justify-between pb-10 pt-10 gap-8 pl-2 pr-2">
        <div class="flex flex-col gap-10">
            <div class="flex items-center gap-2">
                <img src="/src/assets/logo.png" class="w-8">
                <h3 class="font-extrabold text-white text-2xl">Ekskul-Hub</h3>
            </div>
            <div class="flex flex-col gap-5">
                <router-link active-class="!text-black bg-yellow-300 text-black rounded-md"
                    class="text-white flex pl-4 py-3 items-center gap-3" to="/home">
                    <i class="pi pi-home text-lg font-semibold"></i>
                    <h3 class="font-semibold text-lg">Home</h3>
                </router-link>
                <router-link active-class="!text-black bg-yellow-300 text-black rounded-md"
                    class="text-white flex pl-4 py-3 items-center gap-3" to="/schedule">
                    <i class="pi pi-clipboard text-lg font-semibold"></i>
                    <h3 class="font-semibold text-lg">Buat Jadwal</h3>
                </router-link>
                <router-link active-class="!text-black bg-yellow-300 text-black rounded-md"
                    class="text-white flex pl-4 py-3 items-center gap-3" to="/dokumentasi">
                    <i class="pi pi-folder text-lg font-semibold"></i>
                    <h3 class="font-semibold text-lg">Dokumentasi</h3>
                </router-link>
                <router-link active-class="!text-black bg-yellow-300 text-black rounded-md"
                    class="text-white flex pl-4 py-3 items-center gap-3" to="/absen">
                    <i class="pi pi-list-check text-lg font-semibold"></i>
                    <h3 class="font-semibold text-lg">Absensi</h3>
                </router-link>
            </div>
        </div>
        <div class="flex gap-5 items-center justify-center">
            <i class="pi pi-sign-out text-white text-xl font-bold"></i>
            <button @click="LogOut">
                <h3 class="font-bold text-white text-xl">Logout</h3>
            </button>
        </div>
    </div>

    <!-- Small - Medium -->
    <div class="lg:hidden bg-blue-800 w-full py-2">
        <div class="flex justify-between">
            <div class="flex items-center pl-2 gap-3">
                <img src="/src/assets/logo.png" class="w-8">
                <h3 class=" text-white text-center font-bold">Ekskul-Hub</h3>
            </div>
            <button @click="Handleopen">
                <i class="text-white pi pi-list pr-5 font-bold text-2xl"></i>
            </button>
        </div>
        <div v-if="isOpen" class="mt-3 ml-5 mr-5 mb-2 flex flex-col gap-3">
            <div class="border-b w-full border-white"></div>
            <router-link active-class="bg-yellow-400 !text-black" class="text-white rounded-md py-2 flex justify-center"
                to="/home">
                <h3 class="font-bold">Home</h3>
            </router-link>
            <router-link active-class="bg-yellow-400 !text-black" class="text-white rounded-md py-2 flex justify-center"
                to="/schedule">
                <h3 class="font-bold">Jadwal</h3>
            </router-link>
            <router-link active-class="bg-yellow-400 !text-black" class="text-white rounded-md py-2 flex justify-center"
                to="/dokumentasi">
                <h3 class="font-bold">Dokumentasi</h3>
            </router-link>
            <router-link active-class="bg-yellow-400 !text-black" class="text-white rounded-md py-2 flex justify-center"
                to="/absen">
                <h3 class="font-bold">Absensi</h3>
            </router-link>
            <div class="flex gap-5 items-center justify-center">
                <i class="pi pi-sign-out text-white text-xl font-bold"></i>
                <button @click="LogOut">
                    <h3 class="font-bold text-white text-xl">Logout</h3>
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped></style>
