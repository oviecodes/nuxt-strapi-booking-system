

<template>
    <div>
        <!-- side nav -->
        <div class=" ">
            <div class="">
                <NuxtLogo class="w-20 mx-auto" />
            </div>

            <div class="text-white text-center w-full mb-5">
            
                <NuxtLink to="/dashboard">
                    <div ref="index" class="p-5 w-1/3 text-xl mx-auto rounded-full">
                        <font-awesome-icon :icon="['fas', 'home']" />
                    </div>
                    <p class="text-sm text-white">Home</p>
                </NuxtLink>
            </div>
            
            <div class="text-white text-center w-full mb-5">
                <NuxtLink to="/dashboard/guests">
                    <div ref="guests" class="p-5 w-1/3 text-xl mx-auto rounded-full">
                        <font-awesome-icon :icon="['fas', 'users']" />
                    </div>
                    <p class="text-sm text-white">Guests</p>
                </NuxtLink>
            </div>

            <div class="text-white text-center w-full my-5">
                <NuxtLink to="/dashboard/rooms">
                    <div ref="rooms"  class="w-1/3 text-xl mx-auto rounded-full p-5">
                        <font-awesome-icon :icon="['fas', 'bed']" /> 
                    </div>
                    <p class="text-sm text-white">Rooms</p>
                </NuxtLink>
            </div>

            <div class="text-white text-center cursor-pointer w-full my-7">
                <p @click="logout">Logout</p>
            </div>

        </div>
        <!-- end of first div -->
    </div>
</template>

<script>
    export default {
        name: 'SideNav',

        props: ['page'],

        methods: {
            async logout() {
                await this.$strapi.logout()
                .then(() => {
                    this.$auth.$storage.setCookie("authenticated", false)
                    this.$nuxt.$router.push('/')
                })
                  
            }
        },

        mounted() {
            
            // get current link item
            const item = this.$refs[this.page]
            // change it's class
            const addClass = ['bg-purple-800', 'shadow-xl']
            addClass.forEach(e => {
                item.classList.add(e)
            });
        }
    }
</script>

<style scoped>

</style>