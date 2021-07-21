

<template>
    <div>
        <div class="flex w-screen flex-row">
            <!-- first div here    -->
            <!-- side menu -->
            
            <SideNav class="hidden sm:block sm:w-1/6 h-screen bg-purple-600" :page="routeName" />

            <!-- main display -->
            <!-- second div here -->
            <div class="w-full overflow-x-hidden md:w-5/6 h-screen">
                <div class="w-screen h-10 m-8">
                    <h1 class="font-black">Welcome, user</h1>
                </div>
                <div class="w-4/5 mx-auto min-h-screen">
                    <div class="block sm:grid sm:grid-cols-2 sm:gap-4 mb-10 items-center justify-center">
                        <div class="mb-10 sm:mb-0 w-full rounded-xl p-28 bg-pink-300">
                            
                        </div>

                        <div class="mb-10 sm:mb-0 w-full rounded-xl p-32 h-full bg-green-300">
                            
                        </div>
                    </div>

                    <div class='w-full rounded-xl mb-20 p-32 h-full bg-blue-300'>

                    </div>

                </div>
            </div>
            <!-- end of second div -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                routeName: 'index'
            }
        },

        mounted() {
            
        }
    }
</script>

<style scoped>

</style>