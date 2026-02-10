<script setup>
    import { getToken } from '../../utils/helper';
    import { fetchWithAuth, getImageUrl } from '../../utils/api';
    import Sidebar from '../Sidebar/Sidebar.vue';
    import { ref, onMounted, computed, watch } from 'vue'

    const token = getToken()

    const loading = ref(false)
    const error = ref(null)

    const dashboard = ref({})
    const ekskulList = computed(() => dashboard.value?.ekskulList || [])
    const scheduleList = ref([])

    const filterEkskul = ref("")
    const selectedSchedule = ref("")

    const schedule = ref({})
    const Documentations = computed(() => schedule.value?.documentatioData || [])

    import defaultImg from "/orang.png"

    const isCreate = ref(false)

    const getDashboard = async () => {
        try{
            loading.value = true
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

    const getSchedules = async () => {
        try{
            loading.value = true
            const res = await fetchWithAuth(`/api/pembina/schedule`)
            const json = await res.json()
            scheduleList.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat jadwal"
        }
        finally{
            loading.value = false
        }
    }

    const getDocumentation = async () => {
        try{
            if (!selectedSchedule.value) return;
            const res = await fetchWithAuth(`/api/pembina/schedule/${selectedSchedule.value}`)
            const json = await res.json()
            schedule.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat dokumentasi"
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
            formData.append('documentationTitle', form.value.Title)
            formData.append('scheduleId', form.value.ScheduleId)
            formData.append('file', form.value.File)

            const res = await fetchWithAuth(`/api/pembina/documentation`, {
                method: 'POST',
                body: formData
            })

            if(!res.ok){
                throw new Error('Gagal mengupload dokumentasi')
            }

            form.value = {
                Title: '',
                ScheduleId: null,
                File: null
            }

            isCreate.value = false
            if (selectedSchedule.value === form.value.ScheduleId) {
                getDocumentation()
            }
        }
        catch(err){
            console.log(err)
            error.value = "Terjadi kesalahan sistem"
        }
        finally{
            loading.value = false
        }
    }

    onMounted(() => {
        getDashboard(),
        getSchedules()
    })

    watch(filterEkskul, () => {
        selectedSchedule.value = ""
        schedule.value = {}
    })

    watch(selectedSchedule, (val) => {
        if(val){
            getDocumentation()
        }
    })

</script>

<template>
    <div>
        <Sidebar />

        <div v-if="loading && !isCreate" class="p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="bg-white/80 backdrop-blur-md w-full rounded-3xl shadow-xl min-h-[400px] flex justify-center items-center">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        </div>

        <div v-else class="p-6 md:p-10 lg:ml-[20%] xl:ml-[16%]">
            <div class="max-w-6xl mx-auto flex flex-col gap-8">
                
                <!-- View Mode -->
                <div v-if="!isCreate" class="flex flex-col gap-8">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div class="flex items-center gap-4">
                            <div class="w-14 h-14 bg-white rounded-2xl shadow-lg flex items-center justify-center text-blue-600">
                                <i class="pi pi-images text-3xl font-bold"></i>
                            </div>
                            <div>
                                <h2 class="text-3xl font-black text-blue-900 leading-none">Galeri Dokumentasi</h2>
                                <p class="text-blue-400 font-semibold mt-1">Koleksi foto kegiatan ekstrakurikuler</p>
                            </div>
                        </div>
                        <button @click="active" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-2">
                            <i class="pi pi-plus-circle"></i>
                            <span>TAMBAH FOTO</span>
                        </button>
                    </div>

                    <!-- Filters -->
                    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pilih Ekskul</label>
                            <select v-model="filterEkskul" class="w-full py-4 px-6 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-blue-900 shadow-inner cursor-pointer">
                                <option value="">Semua Ekskul</option>
                                <option v-for="e in ekskulList" :key="e.id" :value="e.id">{{ e.name }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-2">
                            <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pilih Jadwal</label>
                            <select v-model="selectedSchedule" :disabled="!filteredSchedule.length" class="w-full py-4 px-6 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-blue-900 shadow-inner cursor-pointer disabled:opacity-50">
                                <option value="">Pilih Jadwal Kegiatan</option>
                                <option v-for="e in filteredSchedule" :key="e.id" :value="e.id">{{ e.title }}</option>
                            </select>
                        </div>
                    </div>

                    <!-- Gallery Grid -->
                    <div v-if="Documentations.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div v-for="e in Documentations" :key="e.id" class="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 relative aspect-square">
                            <img :src="getImageUrl(e.fileUrl)" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                            <div class="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                <h3 class="text-white text-xl font-black transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{{ e.documentationTitle }}</h3>
                                <p class="text-blue-200 text-xs font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 capitalize">{{ filterEkskul ? ekskulList.find(ex => ex.id === filterEkskul)?.name : 'Kegiatan' }}</p>
                            </div>
                        </div>
                    </div>

                    <div v-else class="bg-white/40 rounded-3xl p-24 text-center border-2 border-dashed border-gray-200">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="pi pi-images text-gray-300 text-4xl"></i>
                        </div>
                        <h3 class="text-gray-400 font-black text-2xl">Belum ada dokumentasi</h3>
                        <p class="text-gray-400 font-medium mt-2">Pilih ekskul dan jadwal untuk melihat foto kegiatan</p>
                    </div>
                </div>

                <!-- Create Mode -->
                <transition name="fade">
                    <div v-if="isCreate" class="bg-white rounded-3xl p-8 shadow-2xl border border-blue-50">
                        <div class="flex items-center gap-4 mb-8">
                            <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                                <i class="pi pi-camera text-2xl font-bold"></i>
                            </div>
                            <h3 class="text-3xl font-black text-blue-900">Upload Dokumentasi</h3>
                        </div>

                        <form @submit.prevent="createDokum" class="flex flex-col gap-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex flex-col gap-2">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Judul Foto</label>
                                    <input v-model="form.Title" required class="w-full py-4 px-6 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-700" type="text" placeholder="Contoh: Pemanasan Pagi">                 
                                </div>
                                <div class="flex flex-col gap-2">
                                    <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Pilih Jadwal</label>
                                    <select v-model="form.ScheduleId" required class="w-full py-4 px-6 bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-gray-700 cursor-pointer">
                                        <option :value="null" disabled>-- Pilih Jadwal Kegiatan --</option>
                                        <option v-for="e in scheduleList" :key="e.id" :value="e.id">
                                            {{ e.title }} ({{ e.extracurricular?.name }})
                                        </option>
                                    </select>
                                </div>
                            </div>
                            
                            <div class="flex flex-col gap-2">
                                <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">File Foto/Gambar</label>
                                <div class="relative group">
                                    <input @change="handleFile" required class="hidden" id="file-upload" type="file" accept="image/*">
                                    <label for="file-upload" class="flex flex-col items-center justify-center w-full min-h-[200px] border-4 border-dashed border-gray-100 rounded-3xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-200 transition-all group">
                                        <i class="pi pi-cloud-upload text-4xl text-gray-300 group-hover:text-blue-400 mb-4"></i>
                                        <span class="text-gray-400 font-bold group-hover:text-blue-500">
                                            {{ form.File ? form.File.name : 'Klik untuk pilih file foto' }}
                                        </span>
                                    </label>
                                </div>
                            </div>

                            <div class="flex gap-4 pt-4">
                                <button class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95">UNGAH DOKUMENTASI</button>
                                <button type="button" @click="active" class="bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-4 px-10 rounded-2xl transition-all">BATAL</button>
                            </div>
                            <p v-if="error" class="text-red-500 text-center font-bold">{{ error }}</p>
                        </form>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>