<script setup>
import { getToken } from '../../utils/helper';
import { fetchWithAuth } from '../../utils/api';
import Sidebar from '../Sidebar/Sidebar.vue';
import { ref, onMounted, computed } from 'vue'

const error = ref(null)
const loading = ref(true)
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
        const res = await fetchWithAuth(`/api/pembina/dashboard`)
        const json = await res.json()
        ekskul.value = json.data
    }
    catch (err) {
        error.value = "Gagal memuat dashboard"
    }
    finally {
        loading.value = false
    }
}

const getSchedule = async () => {
    try {
        const res = await fetchWithAuth(`/api/pembina/schedule`)
        const json = await res.json()
        jadwal.value = json.data
    }
    catch (err) {
        error.value = "Gagal memuat jadwal"
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
        const res = await fetchWithAuth(`/api/pembina/schedule`, {
            method: 'POST',
            body: JSON.stringify({
                extracurricularId: selectedEkskul.value,
                title: title.value,
                description: description.value,
                scheduleDate: scheduleDate.value,
                location: location.value
            })
        })

        if (!res.ok) {
            error.value = "Terjadi kesalahan saat membuat jadwal"
        }
        else {
            isCreate.value = false
            error.value = ""
            getSchedule()
        }
    }
    catch (err) {
        console.log(err)
    }
}

const filteredSchedule = computed(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (!jadwal.value) return []

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
    getSchedule()
    dashboard()
})

</script>

<template>
    <div>
        <Sidebar />

        <div v-if="loading" class="p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="bg-white/80 backdrop-blur-md w-full rounded-2xl shadow-xl min-h-[400px] flex justify-center items-center">
                <div class="flex flex-col items-center gap-4">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    <h3 class="text-blue-600 font-bold text-xl uppercase tracking-widest">Memuat Jadwal</h3>
                </div>
            </div>
        </div>

        <div v-else class="p-6 md:p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="max-w-6xl mx-auto flex flex-col gap-8">
                
                <!-- Create Schedule Form -->
                <transition name="fade">
                    <div v-if="isCreate" class="bg-white rounded-3xl p-8 shadow-2xl border border-blue-50">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                <i class="pi pi-calendar-plus text-2xl font-bold"></i>
                            </div>
                            <h3 class="text-3xl font-black text-blue-900">Buat Jadwal Baru</h3>
                        </div>

                        <form @submit.prevent="createJadwal" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Pilih Ekskul</label>
                                <select v-model="selectedEkskul" required
                                    class="bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl w-full py-4 px-6 outline-none transition-all font-semibold">
                                    <option disabled value="">-- Pilih Ekskul --</option>
                                    <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                                </select>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Nama Kegiatan</label>
                                <input v-model="title" required
                                    class="bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl w-full py-4 px-6 outline-none transition-all font-semibold"
                                    placeholder="Contoh: Latihan Rutin Basket">
                            </div>
                            <div class="flex flex-col gap-2 md:col-span-2">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Deskripsi</label>
                                <textarea v-model="description" required rows="3"
                                    class="bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl w-full py-4 px-6 outline-none transition-all font-semibold"
                                    placeholder="Jelaskan detail kegiatan..."></textarea>
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Tanggal</label>
                                <input v-model="scheduleDate" type="date" required
                                    class="bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl w-full py-4 px-6 outline-none transition-all font-semibold">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Lokasi</label>
                                <input v-model="location" required
                                    class="bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl w-full py-4 px-6 outline-none transition-all font-semibold"
                                    placeholder="Contoh: Lapangan Utama">
                            </div>
                            
                            <div class="md:col-span-2 flex flex-col items-center gap-4 mt-4">
                                <div class="flex gap-4 w-full">
                                    <button class="bg-blue-600 hover:bg-blue-700 text-white font-black text-lg py-4 px-8 rounded-2xl flex-1 shadow-lg shadow-blue-200 transition-all active:scale-95">SIMPAN JADWAL</button>
                                    <button type="button" @click="active" class="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 px-8 rounded-2xl transition-all">BATAL</button>
                                </div>
                                <p v-if="error" class="text-red-500 font-bold">{{ error }}</p>
                            </div>
                        </form>
                    </div>
                </transition>

                <!-- Schedule List -->
                <div v-if="!isCreate" class="flex flex-col gap-6">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600">
                                <i class="pi pi-calendar text-3xl font-bold"></i>
                            </div>
                            <div>
                                <h2 class="text-3xl font-black text-blue-900 leading-none">Jadwal Mendatang</h2>
                                <p class="text-blue-400 font-semibold mt-1">Kegiatan ekskul yang telah direncanakan</p>
                            </div>
                        </div>
                        <button @click="active" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                            <i class="pi pi-plus-circle"></i>
                            <span>BUAT JADWAL</span>
                        </button>
                    </div>

                    <div class="bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-white/40 shadow-sm">
                        <div class="flex items-center gap-4">
                            <i class="pi pi-filter-fill text-blue-400 ml-2"></i>
                            <select v-model="filterEkskul"
                                class="bg-white/80 border-2 border-transparent focus:border-blue-400 rounded-2xl w-full md:w-64 py-3 px-6 outline-none transition-all font-bold text-blue-800 shadow-sm cursor-pointer">
                                <option value="">Semua Ekskul</option>
                                <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                            </select>
                        </div>
                    </div>

                    <div v-if="filteredSchedule.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div v-for="s in filteredSchedule" :key="s.id" 
                            class="bg-white p-6 rounded-3xl shadow-md border border-gray-50 flex flex-col gap-4 hover:shadow-xl transition-all group overflow-hidden relative">
                            <div class="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                            
                            <div class="relative">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="bg-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                        {{ s.extracurricular.name }}
                                    </span>
                                    <div class="text-right">
                                        <p class="text-[10px] font-bold text-gray-400 uppercase">Tanggal</p>
                                        <p class="text-sm font-black text-gray-700 leading-tight">{{ formatTanggal(s.scheduleDate) }}</p>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-black text-blue-800 leading-tight mb-4 group-hover:text-blue-600 transition-colors">{{ s.title }}</h3>
                                
                                <div class="flex flex-col gap-3">
                                    <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                                        <i class="pi pi-map-marker text-blue-500"></i>
                                        <span class="text-sm font-bold text-gray-600">{{ s.location }}</span>
                                    </div>
                                    <div class="px-2">
                                        <p class="text-xs text-gray-400 line-clamp-2 leading-relaxed font-medium italic">"{{ s.description }}"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="bg-white/40 rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                        <i class="pi pi-calendar-times text-gray-300 text-6xl mb-4"></i>
                        <p class="text-gray-400 font-black text-xl">Tidak ada jadwal ditemukan</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>