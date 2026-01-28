<script setup>
    import { getToken } from "../../utils/helper";
    import Sidebar from "../Sidebar/Sidebar.vue"
    import { ref, onMounted, computed} from "vue"

    const API_URL = import.meta.env.VITE_API_URL
    const token = getToken()

    const loading = ref(true)
    const error = ref(null)

    const member = ref([])

    const defaultImg = "/src/assets/orang.png"

    const getMember = async () => {
        try{
            loading.value = true
            const res = await fetch(`${API_URL}/api/pembina/member`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const json = await res.json()

            member.value = json.data
        }
        catch(err){
            error.value = err
            console.log(err)
        }
        finally{
            loading.value = false
        }
    }

    const memberImage = (url) => {
        return url ? `${API_URL}/${url}` : defaultImg
    }

    onMounted(() => {
        getMember()
    })

</script>

<template>
    <div>
        <Sidebar />

        <div class="p-10 lg:ml-[16%]">
            <div class="bg-white w-full h-135 rounded-lg">

                <!-- Search Bar -->
                <div class="p-5">
                    <div class="bg-gray-400/30 rounded relative flex items-center gap-3">
                        <input class="w-full py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Cari Anggota">
                        <i class="pi pi-search pl-2 text-blue-600 absolute "></i>
                    </div>
                </div>

                <!-- Card Member -->
                <div class="overflow-y-auto">
                    <div class="h-105 grid grid-cols-2 pl-5 pr-5 gap-10">  
                        <div v-for="e in member" :key="e.id" class="shadow-lg p-2">
                            <div class="flex gap-5 items-center">
                                <div>
                                    <img :src="memberImage(e.profileUrl)" class="border-3 border-blue-900/80 w-25 h-20 rounded-full">
                                </div>
                                <div class="w-full grid grid-cols-2">
                                    <div class="w-full">
                                        <h3 class="capitalize text-blue-500/70 font-bold">{{ e.name }}</h3>
                                        <h3 class="bg-yellow-500 rounded-xl text-center w-1/2">{{ e.extracurricular.name }}</h3>
                                    </div>
                                    <div>
                                        <h3 class="font-semibold">{{ e.email }}</h3>
                                        <h3 class="text-gray-400 font-semibold">
                                            Total Point: 
                                            <span class="text-blue-800 font-bold">
                                                {{ e.totalPoints }}
                                            </span>
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
</template>

<style scoped></style>