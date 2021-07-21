

<template>
    <div class="grid w-4/5 md:w-3/5 mx-auto items-center justify-center h-screen">
        <div class="w-full">
            <h1 class="font-black text-6xl mb-10">Welcome Admin</h1>
            <form @submit="login">
                <div class="">
                    <label for="username" class="w-full my-3">Username</label>
                    <input id="username" v-model="username" placeholder="Enter Username" type="text" class="w-full my-3 p-3 border-2">
                </div>

                <div class="">
                    <label for="password" class="my-3">Password</label> 
                    <span class=""> 
                        <font-awesome-icon v-if="!passwordVisible" :icon="['fas', 'eye']" class="cursor-pointer w-5" @click='switchVisibility' />
                        <font-awesome-icon v-if="passwordVisible" :icon="['fas', 'eye-slash']" class="cursor-pointer text-gray-400 w-5" @click='switchVisibility' />
                    </span>
                    <div class=""> 
                        <input 
                            id="password" 
                            v-model="password" placeholder="Enter password" 
                            :type="passwordFieldType" 
                            class="my-3 p-3 border-2 w-full"
                        >
                        
                    </div>
                </div>

                <button type="submit" class="flex items-center justify-center p-4 bg-blue-500 text-white my-3 rounded-lg">
                    Login <font-awesome-icon class="mx-3" :icon="['fas', 'arrow-right']" />
                </button>              
            </form>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                passwordFieldType: 'password',
                passwordVisible: false
            }
        },
        methods: {
            async login(e) {
                e.preventDefault()
                try {
                    await this.$strapi.login({ identifier: this.username, password: this.password })
                    if(this.$strapi.user)  {
                        this.$auth.$storage.setCookie("authenticated", true)
                        this.$router.push('/dashboard/guests')
                    }
                } catch (e) {
                    console.log(e)
                }
                
            },

            switchVisibility() {
                this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
                this.passwordVisible = !this.passwordVisible
            }
        }
    }
</script>

<style scoped>

</style>