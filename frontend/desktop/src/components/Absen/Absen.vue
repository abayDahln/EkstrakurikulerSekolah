<script setup>
    import { getToken } from '../../utils/helper';
    import { fetchWithAuth, getImageUrl } from '../../utils/api';
    import Sidebar from '../Sidebar/Sidebar.vue';
    import { ref, onMounted, computed, watch} from 'vue'

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
    const attendanceSummary = computed(() => scheduleAbsen.value?.attendanceSummary || { present: 0, sick: 0, izin: 0, alpha: 0 })


    const getDashboard = async () => {
        try{
            const res = await fetchWithAuth(`/api/pembina/dashboard`)
            const json = await res.json()
            dashboard.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat dashboard"
        }
        finally{
            loading.value = false
        }
    }    

    const getSchedule = async () => {
        try{
            const res = await fetchWithAuth(`/api/pembina/schedule`)
            const json = await res.json()
            listJadwal.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat jadwal"
        }
        finally{
            loading.value = false
        }
    }

    const getAbsen = async () => {
        try{
            if (!selectedSchedule.value) return;
            const res = await fetchWithAuth(`/api/pembina/schedule/${selectedSchedule.value}`)
            const json = await res.json()
            scheduleAbsen.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat data absensi"
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

    onMounted(() => {
        getDashboard()
        getSchedule()
    })

    watch(selectedSchedule, (val) => {
        if(val) getAbsen()
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

    const KeteranganClass = (status) => {
        const s = status ? status.toLowerCase() : ''
        const map  = {
            hadir: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            izin: 'bg-sky-100 text-sky-700 border-sky-200',
            sakit: 'bg-amber-100 text-amber-700 border-amber-200',
            alfa: 'bg-rose-100 text-rose-700 border-rose-200'
        }

        return map[s] || 'bg-gray-100 text-gray-500 border-gray-200'
    }

</script>

<template>
    <div>
        <Sidebar />

        <div v-if="loading" class="p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="bg-white/80 backdrop-blur-md w-full rounded-3xl shadow-xl min-h-[500px] flex justify-center items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </div>

        <div v-else class="p-6 md:p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="max-w-6xl mx-auto flex flex-col gap-8">
                
                <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div class="flex items-center gap-4 text-left mr-auto">
                        <div class="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600">
                            <i class="pi pi-check-square text-3xl font-bold"></i>
                        </div>
                        <div>
                            <h2 class="text-3xl font-black text-blue-900 leading-none">Presensi Digital</h2>
                            <p class="text-blue-400 font-semibold mt-1">Monitoring kehadiran anggota</p>
                        </div>
                    </div>
                </div>

                <div class="bg-white rounded-3xl w-full shadow-2xl overflow-hidden border border-gray-100">
                    <!-- Filters & Summary -->
                    <div class="p-8 bg-gradient-to-r from-blue-50 to-transparent border-b border-gray-100">
                        <div class="flex flex-col gap-8">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="flex flex-col gap-2">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Filter Ekskul</label>
                                    <select v-model="filterEkskul" class="w-full py-4 px-6 bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-blue-900 shadow-sm cursor-pointer">
                                        <option value="">Semua Ekskul</option>
                                        <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                                    </select>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pilih Jadwal</label>
                                    <select v-model="selectedSchedule" :disabled="!filteredSchedule.length" class="w-full py-4 px-6 bg-white border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none transition-all font-bold text-blue-900 shadow-sm cursor-pointer disabled:opacity-50">
                                        <option value="">Pilih Jadwal Kegiatan</option>
                                        <option v-for="e in filteredSchedule" :key="e.id" :value="e.id">{{ e.title }}</option>
                                    </select>
                                </div>
                            </div>

                            <div v-if="selectedSchedule" class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                <div class="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex flex-col items-center">
                                    <span class="text-xs font-black text-emerald-400 uppercase mb-1">Hadir</span>
                                    <span class="text-3xl font-black text-emerald-600">{{ attendanceSummary.present || 0 }}</span>
                                </div>
                                <div class="bg-amber-50 p-4 rounded-2xl border border-amber-100 flex flex-col items-center">
                                    <span class="text-xs font-black text-amber-400 uppercase mb-1">Sakit</span>
                                    <span class="text-3xl font-black text-amber-600">{{ attendanceSummary.sick || 0 }}</span>
                                </div>
                                <div class="bg-sky-50 p-4 rounded-2xl border border-sky-100 flex flex-col items-center">
                                    <span class="text-xs font-black text-sky-400 uppercase mb-1">Izin</span>
                                    <span class="text-3xl font-black text-sky-600">{{ attendanceSummary.izin || 0 }}</span>
                                </div>
                                <div class="bg-rose-50 p-4 rounded-2xl border border-rose-100 flex flex-col items-center">
                                    <span class="text-xs font-black text-rose-400 uppercase mb-1">Alfa</span>
                                    <span class="text-3xl font-black text-rose-600">{{ attendanceSummary.alpha || 0 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Attendance Table -->
                    <div class="overflow-x-auto">
                        <table class="w-full">
                            <thead>
                                <tr class="bg-gray-50/50">
                                    <th class="px-8 py-4 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Anggota</th>
                                    <th class="px-8 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Waktu Absen</th>
                                    <th class="px-8 py-4 text-center text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                <tr v-if="attendanceData.length" v-for="e in attendanceData" :key="e.memberId" class="hover:bg-blue-50/30 transition-colors">
                                    <td class="px-8 py-4">
                                        <div class="flex items-center gap-4">
                                            <div class="h-12 w-12 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                                                <img class="w-full h-full object-cover" :src="getImageUrl(e.profileUrl) || defaultImg">
                                            </div>
                                            <div class="flex flex-col">
                                                <span class="font-bold text-blue-900">{{ e.name }}</span>
                                                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{{ e.memberId }}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-8 py-4 text-center">
                                        <div v-if="e.attendanceTime" class="flex flex-col items-center">
                                            <span class="text-sm font-bold text-gray-700">{{ formatDate(e.attendanceTime) }}</span>
                                            <span class="text-[10px] text-emerald-500 font-bold">TEREKAM</span>
                                        </div>
                                        <span v-else class="text-xs font-bold text-gray-300">BELUM ABSEN</span>
                                    </td>
                                    <td class="px-10 py-4 text-center">
                                        <span class="font-black text-[10px] uppercase tracking-widest px-6 py-2 rounded-full border-2 transition-all shadow-sm" :class="KeteranganClass(e.status)">
                                            {{ e.status }}
                                        </span>
                                    </td>
                                </tr>
                                <tr v-else>
                                    <td colspan="3" class="px-8 py-20 text-center">
                                        <div v-if="selectedSchedule" class="flex flex-col items-center gap-4">
                                            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                                <i class="pi pi-info-circle text-3xl"></i>
                                            </div>
                                            <p class="text-gray-400 font-bold">Data absensi belum tersedia untuk jadwal ini</p>
                                        </div>
                                        <div v-else class="flex flex-col items-center gap-4">
                                            <div class="w-16 h-16 bg-blue-50/50 rounded-full flex items-center justify-center text-blue-100">
                                                <i class="pi pi-arrow-up text-3xl"></i>
                                            </div>
                                            <p class="text-blue-300 font-bold">Silakan pilih ekskul dan jadwal terlebih dahulu</p>
                                        </div>
                                    </td>
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