<script setup>
import { useRouter } from 'vue-router';
import { setDemoMode } from '../../utils/helper';

const router = useRouter();

const handleDemo = () => {
    setDemoMode(true);
    localStorage.setItem('token', 'demo-token');
    router.push('/home');
};
</script>

<template>
    <div class="flex flex-col gap-30">

        <!-- Header -->
        <div class="flex justify-between p-5">
            <div class="flex items-center gap-5">
                <img class="w-12" src="/logo.png">
                <h4 class="text-2xl font-bold text-white">Ekskul-Hub</h4>
            </div>
            <div class="flex gap-4">
                <div class="w-45 bg-linear-to-b from-blue-800 to-blue-600 flex items-center rounded-full justify-center py-2 px-4 shadow-lg hover:shadow-blue-500/50 transition-all">
                    <button @click="handleDemo" class="font-bold text-white text-xl cursor-pointer">Coba Demo</button>
                </div>
                <div class="w-45 bg-white flex items-center rounded-full justify-center py-2 px-4 shadow-lg hover:shadow-gray-300/50 transition-all">
                    <router-link to="/login">
                        <button class="font-bold text-blue-600 text-xl cursor-pointer">Login</button>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Body -->
        <div class="flex justify-center">
            <div class="flex flex-col gap-10">
                <div>
                    <h1 class="text-center font-bold text-6xl text-white drop-shadow-md">Sistem Informasi</h1>
                    <h1 class="text-center font-bold text-6xl text-blue-800 drop-shadow-sm">Ekstrakurikuler</h1>
                </div>
                <div class="max-w-xl mx-auto text-center">
                    <h3 class="font-semibold text-xl break-words text-blue-900/60 leading-relaxed">
                        Kelola Ekstrakurikuler Sekolah Dengan Lebih Mudah.<br/>
                        Didesain khusus untuk Pembina dan Siswa.
                    </h3>
                </div>
                <div class="flex justify-center mt-6">
                    <button @click="handleDemo" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-2xl text-2xl shadow-xl transition-all hover:scale-105">
                        Mulai Sekarang
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
