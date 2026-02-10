<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { setDemoMode } from '../../utils/helper'

    const router = useRouter()
    const email = ref("")
    const password = ref("")
    const API_URL = import.meta.env.VITE_API_URL
    const error = ref(null)
    const loading = ref(false)

    const login = async () => {
        try{
            loading.value = true
            setDemoMode(false) // Ensure demo mode is off if logging in normally
            const res = await fetch(`${API_URL}/api/auth/login/pembina`, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })

            if(!res.ok){
                error.value = "Login Gagal"
            }

            const json = await res.json()
            const data = json.data

            localStorage.setItem('token', data.token)

            router.push('/home')
        }
        catch(err){
            error.value = "Email Atau Password Salah"
            console.log(err)
        }
    }

    const handleDemo = () => {
        setDemoMode(true);
        localStorage.setItem('token', 'demo-token');
        router.push('/home');
    }

</script>

<template>

    <div class="flex justify-between overflow-hidden">

        <!-- Form  -->
        <div class="flex flex-col justify-center h-screen gap-5 pl-20 w-110">
            <div>
                <h3 class="text-4xl font-bold">Login</h3>
            </div>
            <form @submit.prevent="login" class="flex flex-col gap-5">
                <div class="flex flex-col gap-5">
                    <div class="w-full">
                        <input v-model="email" class="w-full pl-2 bg-gray-100/90 rounded-md py-2" type="email" placeholder="Masukkan Email" required>
                    </div>
                    <div class="w-full">
                        <input v-model="password" class="w-full pl-2 bg-gray-100/90 rounded-md py-2" type="password" placeholder="Masukkan Password" required>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div>
                        <h3 v-if="loading" class="text-blue-600 font-semibold text-sm">Sedang Memuat</h3>
                        <h3 v-else-if="error" class="text-red-600 text-sm">{{ error }}</h3>
                    </div>
                    <button class="text-white font-semibold bg-linear-to-b from-blue-800 to-blue-500 w-2/5 py-1 rounded-md cursor-pointer hover:opacity-90">Login</button>
                </div>
            </form>
            <div class="flex flex-col gap-3 mt-4">
                <div class="flex items-center gap-2">
                    <div class="h-[1px] bg-gray-300 flex-1"></div>
                    <span class="text-gray-400 text-sm">Atau</span>
                    <div class="h-[1px] bg-gray-300 flex-1"></div>
                </div>
                <button @click="handleDemo" class="w-full py-2 border-2 border-blue-600 text-blue-600 font-bold rounded-md hover:bg-blue-50 transition-colors cursor-pointer">
                    Coba Versi Demo
                </button>
            </div>
        </div>

        <!-- Circle -->
        <div class="relative h-screen w-175 left-50">
            <div class="absolute left-0 top-0 bg-cyan-500 w-175 h-full rounded-full"></div>
            <div class="absolute left-20 top-0 bg-cyan-600 w-175 h-full rounded-full"></div>
            <div class="absolute left-40 top-0 bg-cyan-700 w-175 h-full rounded-full"></div>
        </div>

    </div>

</template>

<style scoped></style>
