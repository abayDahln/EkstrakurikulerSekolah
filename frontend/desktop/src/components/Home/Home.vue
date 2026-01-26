<script setup>
import { getToken } from '../../utils/helper';
import Sidebar from '../Sidebar/Sidebar.vue';
import { onMounted, ref, computed } from 'vue'

const token = getToken()
const API_URL = import.meta.env.VITE_API_URL
const loading = ref(false)
const error = ref(null)
const profile = ref({})
const activityStats = computed(() => profile.value?.activityStats)
const ekskul = computed(() => profile.value?.managedExtracurriculars)

const getProfile = async () => {
    try {
        loading.value = true
        const res = await fetch(`${API_URL}/api/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const json = await res.json()
        profile.value = json.data
    }
    catch (err) {
        error.value = err
    }
    finally{
        loading.value = false
    }
}

onMounted(() => {
    getProfile()
})

</script>

<template>
    <div>
        <!-- Sidebar -->
        <Sidebar />

        <div v-if="loading" class="p-10 lg:ml-[16%]">
            <div class="bg-white w-full pl-5 pr-5 rounded-xl shadow-md min-h-[300px] flex justify-center items-center">
                <h3 class="w-full text-center text-blue-500 text-3xl border-t border-b border-gray-400/40 p-5">Tunggu Sebentar</h3>
            </div>
        </div>

        <div v-else-if="error" class="p-10 lg:ml-[16%]">
            <div class="bg-white w-full pl-5 pr-5 rounded-xl shadow-md min-h-[300px] flex justify-center items-center">
                <h3 class="w-full text-center text-red-500 text-3xl border-t border-b border-gray-400/40 p-5">{{ error }}</h3>
            </div>
        </div>

        <!-- Card -->
        <div v-else class="p-10 lg:ml-[16%]">
            <div class="pb-10 w-full rounded-xl bg-linear-to-b shadow-md from-blue-600 to-blue-500">
                <div class="flex flex-col gap-2">
                    <div class="flex flex-col justify-center gap-2 pt-5 pl-2 pr-2">
                        <h3 class="text-white font-extrabold text-center text-2xl md:text-5xl">Selamat Datang,</h3>
                        <p class="text-yellow-300 font-extrabold text-center text-2xl md:text-5xl">{{ profile.name }}</p>
                    </div>
                    <div class="flex justify-center">
                        <p class="text-white font-semibold text-center pl-5 pr-5">Apa Yang Akan Anda Lakukan Hari Ini?</p>
                    </div>
                </div>

                <!-- Card Profile -->
                <div class="flex justify-center pl-10 pr-10 md:pl-25 md:pr-25 pt-10">
                    <div class="bg-white rounded-lg p-5 w-full">
                        <div class="flex flex-col lg:flex-row gap-5">

                            <!-- Picture -->
                            <div class="flex justify-center">
                                <img :src="`${API_URL}/${profile.profileUrl}`"
                                    class="border-3 border-blue-500 rounded-full w-40">
                            </div>

                            <!-- Detail -->
                            <div class="flex flex-col justify-around">

                                <div class="flex justify-center lg:justify-start pb-5">
                                    <h3 class="font-bold text-2xl text-blue-700">{{ profile.name }}</h3>
                                </div>

                                <div class="flex flex-col gap-3">

                                    <div class="flex justify-center lg:justify-start">
                                        <div class="rounded-full bg-blue-500/50 w-1/3">
                                            <h3 class="text-center capitalize">{{ profile.role }}</h3>
                                        </div>
                                    </div>

                                    <div v-if="activityStats" class="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <p class="text-sm bg-blue-300 py-1 px-2 flex items-center justify-center rounded-full">Total
                                            Ekskul: {{ activityStats.totalManagedExtracurriculars }}</p>
                                        <p class="text-sm bg-blue-300 py-1 px-2 flex items-center justify-center  rounded-full text-center">Total
                                            Jadwal Dibuat: {{ activityStats.totalSchedulesCreated }}</p>
                                        <p class="text-sm bg-blue-300 py-1 px-2 flex items-center justify-center  rounded-full text-center">Total
                                            Jadwal Mendatang: {{ activityStats.upcomingSchedules }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ekskul -->
                <div class="flex flex-col gap-5 pt-10">

                    <div class="flex justify-center">
                        <h3 class="font-bold text-white text-2xl md:text-3xl">Ekskul Yang Dikelola</h3>
                    </div>

                    <div class="flex justify-center ">
                        <!-- Card -->
                        <div v-if="ekskul" class="grid grid-cols-1 md:grid-cols-2 gap-10 w-full pl-10 pr-10">

                            <div v-for="e in ekskul" :key="e.id" class="bg-white rounded-md flex flex-col pb-5 hover:scale-[1.1]">
                                <div class="flex justify-center p-5 pb-0">
                                    <img :src="`${API_URL}/${e.imageUrl}`" class="w-45 h-35 rounded-lg">
                                </div>

                                <div class="flex flex-col gap-3">
                                    <h3 class="text-lg text-blue-700 font-semibold text-center">{{ e.name }}</h3>
                                    <h3 class="text-sm text-gray-500 font-semibold text-center pl-5 pr-5">{{
                                        e.description }}</h3>
                                    <div class="flex flex-col gap-2">
                                        <div class="flex justify-center items-center gap-2">
                                            <i class="pi pi-user text-blue-500 font-extrabold"></i>
                                            <h3 class="flex items-center gap-2 font-bold">
                                                {{ e.totalMembers }}
                                                <p class="font-light">Anggota</p>
                                            </h3>
                                        </div>
                                        <div class="flex justify-center items-center gap-2">
                                            <i class="pi pi-calendar text-blue-500 font-extrabold"></i>
                                            <h3 class="flex items-center gap-2 font-bold">
                                                {{ e.totalSchedules }}
                                                <p class="!font-light">Jadwal</p>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
