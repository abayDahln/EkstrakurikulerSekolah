<script setup>
import { getToken } from '../../utils/helper';
import { fetchWithAuth, getImageUrl } from '../../utils/api';
import Sidebar from '../Sidebar/Sidebar.vue';
import { onMounted, ref, computed } from 'vue'

const token = getToken()
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
        const res = await fetchWithAuth(`/api/pembina/profile`)
        const json = await res.json()
        profile.value = json.data
        name.value = json.data.name
    }
    catch (err) {
        error.value = "Gagal memuat profil"
        console.error(err)
    }
    finally{
        loading.value = false
    }
}

const editProfile = async () => {
    try{
        const res = await fetchWithAuth(`/api/pembina/profile`, {
            method: 'PUT',
            body: JSON.stringify({
                name: name.value,
                email: profile.value.email
            })
        })

        if (res.ok) {
            isEdit.value = false
            getProfile()
        }
    }
    catch(err){
        console.log(err)
        error.value = "Gagal mengedit profil"
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
                    <div class="bg-white rounded-lg p-5 w-full max-w-4xl">
                        <div class="flex flex-col lg:flex-row gap-8 items-center lg:items-start">

                            <!-- Picture -->
                            <div class="flex-shrink-0">
                                <img :src="getImageUrl(profile.profileUrl)"
                                    class="border-4 border-blue-500 rounded-full w-40 h-40 object-cover shadow-lg">
                            </div>

                            <!-- Detail -->
                            <div class="flex flex-col flex-1 gap-4">

                                <div class="w-full flex flex-col sm:flex-row justify-center lg:justify-between items-center gap-4">
                                    <h3 class="font-bold text-3xl text-center text-blue-700">{{ profile.name }}</h3>
                                    <button @click="edit" class="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 rounded-xl py-2 px-6 font-bold shadow-md transition-all transform hover:scale-105 cursor-pointer">
                                        <i class="pi pi-user-edit"></i>
                                        <span>Edit Profile</span>
                                    </button>
                                </div>

                                <div class="flex flex-col gap-5">
                                    <div class="flex justify-center lg:justify-start">
                                        <div class="rounded-full bg-yellow-100 text-yellow-800 border-2 border-yellow-200 font-bold px-8 py-1 shadow-sm">
                                            <h3 class="text-center capitalize">{{ profile.role }}</h3>
                                        </div>
                                    </div>

                                    <div v-if="activityStats" class="grid grid-cols-1 md:grid-cols-3 font-semibold gap-4">
                                        <div class="bg-blue-50 border border-blue-100 py-3 px-4 rounded-2xl flex flex-col items-center shadow-sm">
                                            <span class="text-2xl font-bold text-blue-600">{{ activityStats.totalManagedExtracurriculars }}</span>
                                            <span class="text-xs text-blue-400 uppercase tracking-wider">Total Ekskul</span>
                                        </div>
                                        <div class="bg-blue-50 border border-blue-100 py-3 px-4 rounded-2xl flex flex-col items-center shadow-sm">
                                            <span class="text-2xl font-bold text-blue-600">{{ activityStats.totalSchedulesCreated }}</span>
                                            <span class="text-xs text-blue-400 uppercase tracking-wider">Jadwal Dibuat</span>
                                        </div>
                                        <div class="bg-blue-50 border border-blue-100 py-3 px-4 rounded-2xl flex flex-col items-center shadow-sm">
                                            <span class="text-2xl font-bold text-blue-600">{{ activityStats.upcomingSchedules }}</span>
                                            <span class="text-xs text-blue-400 uppercase tracking-wider">Mendatang</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Ekskul -->
                <div class="flex flex-col gap-6 pt-12">
                    <div class="flex justify-center">
                        <h3 class="font-bold text-white text-3xl drop-shadow-sm">Ekskul Yang Dikelola</h3>
                    </div>

                    <div class="flex justify-center px-4 md:px-10">
                        <div v-if="ekskul" class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
                            <div v-for="e in ekskul" :key="e.id" class="bg-white rounded-3xl overflow-hidden flex flex-col pb-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group">
                                <div class="relative h-48 overflow-hidden">
                                    <img :src="getImageUrl(e.imageUrl)" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
                                    <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                        <h3 class="text-xl text-white font-bold">{{ e.name }}</h3>
                                    </div>
                                </div>

                                <div class="p-6 flex flex-col gap-4">
                                    <p class="text-gray-600 text-sm leading-relaxed line-clamp-2">{{ e.description }}</p>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div class="flex items-center gap-3 bg-blue-50 p-3 rounded-2xl">
                                            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-500">
                                                <i class="pi pi-users font-bold"></i>
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="font-bold text-blue-700">{{ e.totalMembers }}</span>
                                                <span class="text-[10px] text-blue-400 uppercase font-bold">Anggota</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-3 bg-cyan-50 p-3 rounded-2xl">
                                            <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-cyan-500">
                                                <i class="pi pi-calendar font-bold"></i>
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="font-bold text-cyan-700">{{ e.totalSchedules }}</span>
                                                <span class="text-[10px] text-cyan-400 uppercase font-bold">Jadwal</span>
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
    </div>
</template>

<style scoped></style>
