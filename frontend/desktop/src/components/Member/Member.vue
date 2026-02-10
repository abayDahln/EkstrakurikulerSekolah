<script setup>
    import { getToken } from "../../utils/helper";
    import { fetchWithAuth, getImageUrl } from "../../utils/api";
    import Sidebar from "../Sidebar/Sidebar.vue"
    import { ref, onMounted} from "vue"

    const token = getToken()
    const loading = ref(true)
    const error = ref(null)
    const member = ref([])

    import defaultImg from "/orang.png"

    const getMember = async () => {
        try{
            loading.value = true
            const res = await fetchWithAuth(`/api/pembina/member`)
            const json = await res.json()
            member.value = json.data
        }
        catch(err){
            error.value = "Gagal memuat daftar anggota"
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    const memberImage = (url) => {
        return url ? getImageUrl(url) : defaultImg
    }

    onMounted(() => {
        getMember()
    })

</script>

<template>
    <div>
        <Sidebar />

        <div class="p-10 lg:ml-[16%]">
            <div class="bg-white/90 backdrop-blur-sm w-full min-h-[500px] rounded-3xl shadow-2xl overflow-hidden border border-white/20">

                <!-- Header & Search Bar -->
                <div class="p-8 border-b border-gray-100">
                    <div class="flex flex-col md:flex-row justify-between items-center gap-6">
                        <h2 class="text-3xl font-extrabold text-blue-800">Manajemen Anggota</h2>
                        <div class="w-full md:w-96 bg-gray-50 rounded-2xl relative flex items-center shadow-inner border border-gray-200">
                            <i class="pi pi-search pl-4 text-gray-400 absolute"></i>
                            <input class="w-full py-4 pl-12 pr-4 bg-transparent focus:outline-none text-gray-700 font-medium" placeholder="Cari Anggota...">
                        </div>
                    </div>
                </div>

                <div v-if="loading" class="flex justify-center items-center h-64">
                    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>

                <div v-else-if="error" class="p-8 text-center text-red-500 font-bold">
                    {{ error }}
                </div>

                <!-- Card Member Grid -->
                <div v-else class="p-8">
                    <div class="grid grid-cols-1 xl:grid-cols-2 gap-8">  
                        <div v-for="e in member" :key="e.id" class="bg-white rounded-2xl p-6 shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div class="flex items-center gap-6">
                                <div class="flex-shrink-0">
                                    <img :src="memberImage(e.profileUrl)" class="border-4 border-blue-100 w-24 h-24 rounded-2xl object-cover shadow-sm">
                                </div>
                                <div class="flex-1 min-w-0">
                                    <div class="flex flex-col gap-2">
                                        <div class="flex justify-between items-start">
                                            <h3 class="capitalize text-blue-900 font-extrabold text-xl truncate">{{ e.name }}</h3>
                                            <span class="bg-yellow-100 text-yellow-700 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-yellow-200">
                                                {{ e.extracurricular?.name }}
                                            </span>
                                        </div>
                                        <div class="flex flex-col gap-3">
                                            <div class="flex items-center gap-2 text-gray-400 text-sm">
                                                <i class="pi pi-envelope"></i>
                                                <span class="truncate">{{ e.email }}</span>
                                            </div>
                                            <div class="flex items-center justify-between bg-blue-50/50 p-2 rounded-xl border border-blue-100/30">
                                                <span class="text-xs font-bold text-blue-400 uppercase">Kontribusi</span>
                                                <div class="flex items-center gap-1">
                                                    <i class="pi pi-star-fill text-yellow-500 text-sm"></i>
                                                    <span class="text-blue-800 font-black text-lg">{{ e.totalPoints }}</span>
                                                    <span class="text-blue-400 text-xs font-bold uppercase">Poin</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="!loading && member.length === 0" class="p-20 text-center">
                    <div class="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                        <i class="pi pi-users text-gray-300 text-4xl"></i>
                    </div>
                    <p class="text-gray-400 font-bold">Belum ada anggota terdaftar</p>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.overflow-y-auto::-webkit-scrollbar {
    width: 6px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    border-radius: 10px;
}
</style>