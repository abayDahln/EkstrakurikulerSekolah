<script setup>

</script>

<template>
    <div class="flex flex-col gap-30">

        <!-- Header -->
        <div class="flex justify-between p-5">
            <div class="flex items-center gap-5">
                <img class="w-12" src="/logo.png">
                <h4 class="text-2xl font-bold text-white">Ekskul-Hub</h4>
            </div>
            <div class="w-45 bg-linear-to-b from-blue-800 to-blue-600 flex items-center rounded-full justify-center">
                <router-link to="/login">
                    <button class="font-bold text-white text-xl">Login</button>
                </router-link>
            </div>
        </div>

        <!-- Body -->
        <div class="flex justify-center">
            <div class="flex flex-col gap-10">
                <div>
                    <h1 class="text-center font-bold text-6xl">Sistem Informasi</h1>
                    <h1 class="text-center font-bold text-6xl text-blue-600">Ekstrakurikuler</h1>
                </div>
                <div>
                    <h3 class="font-semibold text-xl break-words text-gray-400">Kelola Ekstrakurikuler Sekolah Dengan
                        Lebih Mudah Didesain
                        untuk Pembina</h3>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped></style>
