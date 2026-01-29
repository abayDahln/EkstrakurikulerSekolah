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
const name = ref("")
const isEdit = ref(false)

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

const editProfile = async () => {
    try{
        const res = await fetch(`${API_URL}/api/profile`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name.value,
                email: profile.email
            })
        })

        isEdit.value = !isEdit.value
        getProfile()
    }
    catch(err){
        console.log(err)
        error.value = err
    }
}

const edit = () => {
    isEdit.value = !isEdit.value
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

            <!-- Form Edit -->
            <div v-if="isEdit == true" class="bg-white w-full rounded-xl pb-5">
                <div class="p-5 flex flex-col gap-5">
                    <div class="flex justify-between">
                        <div>
                            <h3 class="font-bold text-2xl">Edit profile</h3>
                        </div>
                        <div class="">
                            <button @click="edit" class="bg-gray-400 font-semibold text-white rounded-md px-5 py-2">Cancel</button>
                        </div>
                    </div>
                    <div>
                        <form @submit.prevent="editProfile" class="flex flex-col gap-5">
                            <input type="text" v-model="name" class="w-full py-2 pl-5 border-2 border-gray-400/40 rounded-md">
                            <button class="bg-blue-500 rounded-md py-2 font-semibold text-white w-1/3">Save</button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Profile -->
            <div v-else class="pb-10 w-full rounded-xl bg-linear-to-b shadow-md from-blue-600 to-blue-500">
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
                    <div class="bg-white rounded-lg p-5">
                        <div class="flex flex-col lg:flex-row gap-5">

                            <!-- Picture -->
                            <div class="flex justify-center">
                                <img :src="`${API_URL}/${profile.profileUrl}`"
                                    class="border-3 border-blue-500 rounded-full w-40">
                            </div>

                            <!-- Detail -->
                            <div class="flex flex-col justify-around">

                                <div class="w-full flex flex-col sm:flex-row justify-center lg:justify-between pb-5">
                                    <h3 class="font-bold text-2xl text-center text-blue-700">{{ profile.name }}</h3>
                                    <button @click="edit" class="flex items-center gap-2 bg-yellow-400 rounded-md py-2 px-2 font-semibold">
                                        <i class="pi pi-user-edit"></i>
                                        <h3>Edit Profile</h3>
                                    </button>
                                </div>

                                <div class="flex flex-col gap-3">

                                    <div class="flex justify-center lg:justify-start">
                                        <div class="rounded-full bg-yellow-500/80 font-semibold">
                                            <h3 class="text-center capitalize px-6">{{ profile.role }}</h3>
                                        </div>
                                    </div>

                                    <div v-if="activityStats" class="grid grid-cols-1 md:grid-cols-3 font-semibold gap-3">
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
