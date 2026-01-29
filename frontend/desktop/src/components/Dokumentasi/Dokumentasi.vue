<script setup>
    import { getToken } from '../../utils/helper';
    import Sidebar from '../Sidebar/Sidebar.vue';
    import { ref, onMounted, computed, watch } from 'vue'

    const API_URL = import.meta.env.VITE_API_URL
    const token = getToken()

    const loading = ref(false)
    const error = ref(null)

    const dashboard = ref({})
    const ekskulList = computed(() => dashboard.value?.ekskulList || [])
    const scheduleList = ref([])

    const filterEkskul = ref("")
    const selectedSchedule = ref("")

    const schedule = ref({})
    const Documentations = computed(() => schedule.value?.documentations || [])

    const defaultImg = "/src/assets/orang.png"

    const isCreate = ref(false)

    const Dashboard = async () => {
        try{
            loading.value = true

            const res = await fetch(`${API_URL}/api/pembina/dashboard`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const json = await res.json()
            dashboard.value = json.data

        }
        catch(err){
            error.value = err
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    const Schedule = async () => {
        try{
            loading.value = true
            const res = await fetch(`${API_URL}/api/schedule`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const json = await res.json()
            scheduleList.value = json.data

        }
        catch(err){
            error.value = err
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    const Documentation = async () => {
        try{
            const res = await fetch(`${API_URL}/api/schedule/${selectedSchedule.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const json = await res.json()
            schedule.value = json.data
        }
        catch(err){
            error.value = err
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    const filteredSchedule = computed(() => {
        return scheduleList.value
        .filter(s => {
            if(!filterEkskul.value) return true
            return s.extracurricular.id === filterEkskul.value
        })
    })

    const image = (url) => {
        return url ? `${API_URL}/${url}` : defaultImg
    }

    const active = () => {
        isCreate.value = !isCreate.value
    }

    const form = ref({
        Title: '',
        ScheduleId: null,
        File: null
    })

    const handleFile = (e) => {
        form.value.File = e.target.files[0]
    }

    const createDokum = async () => {
        try{
            loading.value = true

            const formData = new FormData()
            formData.append('Title', form.value.Title)
            formData.append('ScheduleId', form.value.ScheduleId)
            formData.append('File', form.value.File)

            const res = await fetch(`${API_URL}/api/pembina/documentation`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            })

            if(!res){
                throw new Error('Gagal')
            }

            form.value = {
                Title: '',
                ScheduleId: null,
                File: null
            }

            isCreate.value = !isCreate.value
            Documentation()
        }
        catch(err){
            console.log(err)
            err.value = err
        }
        finally{
            loading.value = false
        }
    }

    onMounted(() => {
        Dashboard(),
        Schedule()
    })

    watch(filterEkskul, () => [
        selectedSchedule.value = "",
        schedule.value = {}
    ])

    watch(selectedSchedule, (val) => {
        if(val){
            Documentation()
        }
    })

</script>

<template>
    <div>
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

        <div v-else class="p-10 lg:ml-[16%]">

            <div v-if="isCreate == false" class="bg-white w-full rounded-lg h-full shadow-lg pb-5">
                <div class="grid grid-cols-1">

                    <!-- Title -->
                    <h3 class="text-center font-bold text-3xl pt-2">Dokumentasi Ekstrakurikuler</h3>

                    <div class="w-1/2 pl-5">
                        <button @click="active" class="bg-blue-500 rounded-lg py-2 font-bold text-sm text-white w-1/3">Tambah Dokumentasi</button>
                    </div>

                    <!-- Filter -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-5 p-5">
                        <div class="shadow-md rounded-md border border-gray-400/40">
                            <select v-model="filterEkskul" v-if="ekskulList" class="w-full p-2 pl-5 bg-gray-400/20 rounded-md">
                                <option value="">Ekskul</option>
                                <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                            </select>
                        </div>
                        <div class="shadow-md rounded-md border border-gray-400/40">
                            <select v-model="selectedSchedule" v-if="filteredSchedule.length" class="w-full p-2 pl-5 bg-gray-400/20 rounded-md">
                                <option value="">Jadwal</option>
                                <option v-for="e in filteredSchedule" :key="e.id" :value="e.id">{{e.title }}</option>
                            </select>
                        </div>
                    </div>

                </div>

                <!-- Card-Dokum -->
                <div v-if="Documentations.length" class="pl-5 pr-5 grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div v-for="e in Documentations" class="bg-gray-400/50 rounded-md p-5">
                        <div class="relative h-75 rounded-md overflow-hidden group">
                            <img :src="image(e.fileUrl)" class="w-full h-full object-cover"/>
                            
                            <div class="absolute inset-0 bg-black/60 flex items-end justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                <h3 class="text-white text-lg font-semibold mb-4">{{ e.documentationTitle }}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-else>
                    <div class="pl-5 pr-5">
                        <h3 class="text-center text-2xl font-bold text-gray-400 border-t border-b border-gray-400/40 p-2">Tidak Ada Documentation</h3>
                    </div>
                </div>
            </div>

            <!-- Form Dokum -->
            <div v-else class="bg-white w-full rounded-lg h-full shadow-lg pb-5">
                <div class="flex flex-col gap-5">
                    <div class="flex justify-center">
                        <h3 class="font-bold text-3xl pt-2">Tambah Dokumentasi</h3>
                    </div>
                    <div class="pl-5 pr-5">
                        <form @submit.prevent="createDokum" class="flex flex-col gap-4">
                            <input v-model="form.Title" class="w-full py-2 border-2 shadow-md border-gray-400/40 rounded-md pl-5" type="text" placeholder="Masukkan Nama Kegiatan">                 
                            <select v-model="form.ScheduleId" class="w-full py-2 border-2 shadow-md border-gray-400/40 rounded-md pl-5">
                                <option disabled>-- Pilih Jadwal --</option>
                                <option v-for="e in scheduleList" :value="e.id">{{ e.title }} 
                                    <span class="font-bold">{{ e.extracurricular.name }}
                                    </span>
                                </option>
                            </select>
                            <input @change="handleFile" class="w-full py-2 border-2 shadow-md border-gray-400/40 rounded-md pl-5" type="file">
                            <div class="grid grid-cols-2 gap-10">
                                <button class="bg-blue-500 py-2 rounded-md font-bold text-white">Tambah</button>
                                <button @click="active" class="bg-gray-400 py-2 rounded-md font-bold text-white">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>