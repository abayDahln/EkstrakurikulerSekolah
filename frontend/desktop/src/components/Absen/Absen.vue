<script setup>
    import { getToken } from '../../utils/helper';
    import Sidebar from '../Sidebar/Sidebar.vue';
    import { ref, onMounted, computed, watch} from 'vue'

    const API_URL = import.meta.env.VITE_API_URL
    const token = getToken()

    const loading = ref(true)
    const error = ref(null)
    const dashboard = ref("")
    const ekskulList = computed(() => dashboard.value?.ekskulList)
    const listJadwal = ref([])
    const filterEkskul = ref("")
    const scheduleAbsen = ref({})
    const selectedSchedule = ref("")

    import defaultImg from "/orang.png"

    const attendanceData = computed(() => scheduleAbsen.value?.attendanceData || [])
    const attendanceSummary = computed(() => scheduleAbsen.value?.attendanceSummary || {})


    const Ekskul = async () => {
        try{
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
            const res = await fetch(`${API_URL}/api/schedule`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const json = await res.json()
            listJadwal.value = json.data
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
        return listJadwal.value
        .filter(s => {
            if(!filterEkskul.value) return true
            return s.extracurricular.id === filterEkskul.value
        })
    })

    const Absen = async () => {
        try{
            const res = await fetch(`${API_URL}/api/pembina/schedule/${selectedSchedule.value}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const json = await res.json()
            scheduleAbsen.value = json.data
        }
        catch(err){
            error.value = err
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    onMounted(() => {
        Ekskul(),
        Schedule()
    })

    watch(selectedSchedule, (val) => {
        if(val) Absen()
    })

    watch(filterEkskul, () => {
    selectedSchedule.value = ""
    scheduleAbsen.value = {}
    })

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('id-ID', {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const Keterangan = (status) => {
        const map  = {
            hadir: 'bg-green-400 rounded-full py-2 px-5',
            izin: 'bg-sky-300 rounded-full py-2 px-5',
            sakit: 'bg-yellow-400 rounded-full py-2 px-5',
            alfa: 'bg-red-400 rounded-full py-2 px-5'
        }

        return map[status] || 'text-gray-400'
    }

    const image = (url) => {
        return url ? `${API_URL}/${url}` : defaultImg
    }


</script>

<template>
    <div>
        <div>
            <Sidebar />
        </div>

        <div v-if="loading" class="p-11 lg:ml-[16%]">
            <div class="bg-white w-full pl-5 pr-5 rounded-xl shadow-md min-h-[300px] flex justify-center items-center">
                <h3 class="w-full text-center text-blue-500 text-3xl border-t border-b border-gray-400/40 p-5">Tunggu Sebentar</h3>
            </div>
        </div>

        <div v-else-if="error" class="p-11 lg:ml-[16%]">
            <div class="bg-white w-full pl-5 pr-5 rounded-xl shadow-md min-h-[300px] flex justify-center items-center">
                <h3 class="w-full text-center text-red-500 text-3xl border-t border-b border-gray-400/40 p-5">{{ error }}</h3>
            </div>
        </div>

        <div v-else class="p-10 pl-11 lg:ml-[16%]">
            <div class="bg-white rounded-xl w-full h-full p-5 flex flex-col gap-5">
                <div class="flex flex-col md:flex-row gap-5 justify-between">
                    <h3 class="font-bold text-xl pl-2 text-center">Data Absen</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                        <div class="border border-gray-400/40 rounded-md">
                            <select v-model="filterEkskul" v-if="ekskulList" class="w-full bg-gray-400/10 rounded-md py-1 h-full px-5">
                                <option value="">Ekskul</option>
                                <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                            </select>
                        </div>
                        <div class="border border-gray-400/40 rounded-md">
                            <select v-model="selectedSchedule" v-if="filteredSchedule.length" class="w-full bg-gray-400/10 py-1 h-full px-5">
                                <option value="">Jadwal</option>
                                <option v-for="e in filteredSchedule" :key="e.id" :value="e.id">{{ e.title }}</option>
                            </select>
                        </div>
                    </div>
                </div>
                    <div v-if="attendanceSummary" class="grid lg:grid-cols-4 grid-cols-2 pl-2">
                        <h3 class="text-green-400">Hadir: {{ attendanceSummary.present }}</h3>
                        <h3 class="text-yellow-400">Sakit:  {{ attendanceSummary.sick }}</h3>
                        <h3 class="text-sky-300">Izin: {{ attendanceSummary.izin }} </h3>
                        <h3 class="text-red-400">Alfa: {{ attendanceSummary.alpha }}</h3>
                    </div>
                <div>
                    <div class="overflow-x-auto p-2">
                        <table class="min-w-[700px] w-full shadow-md rounded-lg">
                            <thead>
                                <tr class="">
                                    <th class="bg-gray-100 py-2 border-r border-gray-400/50">No</th>
                                    <th class="bg-gray-100 py-2 border-r border-gray-400/50">Nama</th>
                                    <th class="bg-gray-100 py-2 border-r border-gray-400/50">Waktu Absen</th>
                                    <th class="bg-gray-100 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="attendanceData.length" v-for="(e, i) in attendanceData">
                                    <td class="text-center py-2 border-r border-b border-gray-400/50">{{ i + 1 }}</td>
                                    <td class="border-r border-b border-gray-400/50 pl-5 py-2">
                                        <div class="flex items-center gap-5">
                                            <img class="rounded-full w-15" :src="image(e.profileUrl)">
                                            <span class="font-semibold">{{ e.name }}</span>
                                        </div>
                                    </td>
                                    <td v-if="e.attendanceTime != null" class="text-center py-2 border-r border-b border-gray-400/50">{{ formatDate(e.attendanceTime) }}</td>
                                    <td v-else class="text-center py-2 border-r border-b border-gray-400/50">---</td>
                                    <td class="text-center py-2 border-b border-gray-400/50">
                                        <span class="capitalize" :class="Keterangan(e.status)">
                                            {{ e.status }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td class="text-center p-5 font-bold text-gray-400" colspan="4">Tidak Ada Absensi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>