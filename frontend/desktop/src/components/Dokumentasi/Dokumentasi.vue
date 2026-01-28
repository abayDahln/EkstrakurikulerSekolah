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
            <div class="bg-white w-full rounded-lg h-full shadow-lg pb-5">
                <div class="grid grid-cols-1">

                    <!-- Title -->
                    <h3 class="text-center font-bold text-3xl pt-2">Dokumentasi Ekstrakurikuler</h3>

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
        </div>
    </div>
</template>

<style scoped>

</style>