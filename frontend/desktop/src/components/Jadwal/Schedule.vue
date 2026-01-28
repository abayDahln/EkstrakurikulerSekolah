<script setup>
import { getToken } from '../../utils/helper';
import Sidebar from '../Sidebar/Sidebar.vue';
import { ref, onMounted, computed } from 'vue'

const error = ref(null)
const loading = ref(true)
const API_URL = import.meta.env.VITE_API_URL
const jadwal = ref([])
const token = getToken()
const ekskul = ref([])
const ekskulList = computed(() => ekskul.value?.ekskulList)
const filterEkskul = ref("")

const title = ref("")
const selectedEkskul = ref("")
const scheduleDate = ref("")
const description = ref("")
const location = ref("")

const isCreate = ref(false)

const dashboard = async () => {
    try {
        const res = await fetch(`${API_URL}/api/pembina/dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const json = await res.json()
        ekskul.value = json.data

    }
    catch (err) {
        error.value = err
    }
    finally {
        loading.value = false
    }
}

const schedule = async () => {
    try {
        const res = await fetch(`${API_URL}/api/schedule`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        const json = await res.json()
        jadwal.value = json.data
    }
    catch (err) {
        error.value = err
    }
    finally {
        loading.value = false
    }
}

const formatTanggal = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}

const createJadwal = async () => {
    try {
        const res = await fetch(`${API_URL}/api/pembina/schedule`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                extracurricularId: selectedEkskul.value,
                title: title.value,
                description: description.value,
                scheduleDate: scheduleDate.value,
                location: location.value
            })
        })

        if (!res.ok) {
            error.value = "Isi Yang Benar"
        }
        else {
            isCreate.value = !isCreate.value
            error.value = ""
            schedule()
        }
    }
    catch (err) {
        console.log(err)
    }
    finally {
        loading.value = false
    }
}

const filteredSchedule = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return jadwal.value
        .filter(s => {
            const tanggal = new Date(s.scheduleDate)
            tanggal.setHours(0, 0, 0, 0)
            return tanggal >= today
        })
        .filter(s => {
            if (!filterEkskul.value) return true
            return s.extracurricular.id === filterEkskul.value
        })
        .sort((a, b) => {
            return new Date(a.scheduleDate) - new Date(b.scheduleDate)
        })
})

const active = () => {
    isCreate.value = !isCreate.value
}

onMounted(() => {
    schedule(),
        dashboard()
})

</script>

<template>
    <div>
        <Sidebar />

        <div v-if="loading" class="p-10 lg:ml-[16%]">
            <div class="bg-white w-full pl-5 pr-5 rounded-xl shadow-md min-h-[300px] flex justify-center items-center">
                <h3 class="w-full text-center text-blue-500 text-3xl border-t border-b border-gray-400/40 p-5">Tunggu
                    Sebentar</h3>
            </div>
        </div>

        <div v-else class="pl-10 pr-10 pt-10 lg:ml-[16%]">

            <div class="grid grid-rows-1 pb-10">
                <div v-if="isCreate == true">
                    <div class="bg-white p-5 rounded-xl flex flex-col gap-5">
                        <div class="flex justify-center">
                            <h3 class="text-2xl font-bold text-center">Buat Jadwal baru</h3>
                        </div>

                        <div v-if="ekskulList" class="">
                            <form @submit.prevent="createJadwal" class="flex flex-col gap-5">
                                <div class="shadow-md">
                                    <select v-model="selectedEkskul"
                                        class="border-2 border-gray-400/50 rounded-md w-full py-3 pl-5">
                                        <option disabled value="">-- Select Ekskul --</option>
                                        <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                                    </select>
                                </div>
                                <div class="shadow-md">
                                    <input v-model="title"
                                        class="border-2 border-gray-400/50 rounded-md w-full py-3 pl-5"
                                        placeholder="Masukkan Nama Kegiatan">
                                </div>
                                <div class="shadow-md">
                                    <textarea v-model="description"
                                        class="border-2 border-gray-400/50 rounded-md w-full py-5 pl-5 pr-5"
                                        placeholder="Masukkan Description Kegiatan"></textarea>
                                </div>
                                <div class="shadow-md">
                                    <input v-model="scheduleDate" type="date"
                                        class="border-2 border-gray-400/50 rounded-md w-full py-3 pl-5 pr-5">
                                </div>
                                <div class="shadow-md">
                                    <input v-model="location"
                                        class="border-2 border-gray-400/50 rounded-md w-full py-3 pl-5"
                                        placeholder="Masukkan Lokasi Kegiatan">
                                </div>
                                <div class="shadow-md grid grid-cols-2 gap-5">
                                    <button class="bg-blue-800 text-white font-semibold text-center rounded-md py-3">Buat Jadwal</button>
                                    <button @click="active()" class="bg-gray-400 font-semibold text-center rounded-md py-3 text-white">Cancel</button>
                                </div>
                                <div class="flex justify-center">
                                    <h3 class="text-red-500">{{ error }}</h3>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <!-- Jadwal -->
                <div v-else class="bg-gray-100/70 p-5 rounded-xl flex flex-col gap-3">
                    <div class="flex justify-center">
                        <h3 class="text-2xl font-bold text-center">Jadwal Ekskul yang Akan Datang</h3>
                    </div>
                    <div class="flex justify-start">
                        <button @click="active()"  class="bg-blue-800/70 text-white font-bold rounded-lg w-1/5 py-1">Buat Jadwal</button>
                    </div>
                    <div class="">
                        <select v-model="filterEkskul"
                            class="w-full pr-5 pl-5 rounded-md border-2 border-gray-400/50 py-2">
                            <option value="">All</option>
                            <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                        </select>
                    </div>
                    <div v-if="filteredSchedule.length"
                        class="max-h-[400px] overflow-y-auto pr-5 pl-5 grid grid-cols-2 gap-5">
                        <div v-for="s in filteredSchedule" class="shadow-lg bg-gray-400/20 p-3" :key="s.id">
                            <h3 class="text-blue-500 font-bold capitalize">{{ s.title }}</h3>
                            <h3 class="text-sm">{{ formatTanggal(s.scheduleDate) }}</h3>
                            <h3 class="text-sm">{{ s.location }}</h3>
                            <h3 class="text-sm text-gray-400">{{ s.extracurricular.name }}</h3>
                        </div>
                    </div>
                    <div v-else class="">
                        <h3 class="text-blue-700 text-center font-bold">Tidak Ada Jadwal</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scoped></style>