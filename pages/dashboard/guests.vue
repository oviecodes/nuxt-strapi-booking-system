
<template>
    <div>
        <div ref="guest" class="flex w-screen flex-row">
            <!-- first div here    -->
            <!-- side menu -->
            
            <SideNav class="hidden sm:block sm:w-1/6 h-screen bg-purple-600" :page="routeName" />

            <!-- main display -->
            <!-- second div here -->
            <div class="w-full relative overflow-x-hidden md:w-5/6 h-screen">

                <div v-if="addGuest" class="w-screen h-full top-0 bottom-0 z-10 fixed bg-opacity-30 bg-gray-300">
                   <AddGuest class="z-10 top-5 left-0 overflow-y-scroll right-0 shadow-2xl bottom-5 bg-white mx-auto fixed" /> 
                </div>

                <div class="w-screen h-10 m-8">
                    <h1 class="text-2xl text-gray-500 font-black">Manage Guests</h1>
                </div>
                <div class="w-4/5 mx-auto min-h-screen">

                    <div class="block sm:grid sm:grid-cols-2 sm:gap-4 mb-10 items-center justify-center">

                        <!-- active users -->
                        <div class="mb-10 sm:mb-0 shadow-2xl grid grid-cols-2 items-center justify-center gap-6 text-white w-full rounded-xl p-8 lg:p-16 bg-pink-500">
                            <font-awesome-icon class="text-6xl lg:text-8xl" :icon="['fas', 'users']" />
                            <div class="text-2xl font-bold">
                                <p> Over {{ allGuests.length }} Guests Lodged</p>
                            </div>
                        </div>


                        <!-- messages -->
                        <div class="">
                            <div class="my-3 font-black">
                                <font-awesome-icon :icon="['fas', 'bell']" /> Notifications
                            </div>

                            <div class="mb-10 sm:mb-0 w-full divide-y divide-white text-sm relative rounded-xl text-white p-5 h-32 overflow-y-scroll bg-green-500">
                                <p class="p-2">
                                   <font-awesome-icon :icon="['fas', 'circle']" />
                                   Alexander Godwin checked just checked into room 43
                                </p>
                                
                                <p class="p-2">
                                   <font-awesome-icon :icon="['fas', 'circle']" />
                                   Alexander Godwin checked just checked into room 43
                                </p>
                                 
                            </div>
                        </div>
                    </div>
                    
                    <!-- table part -->

                    <div class="w-full grid grid-cols-2 space-between items-center">
                      <h1 class="my-5 text-2xl font-black">All Guests</h1>
                    
                      <div class="text-right">
                        
                        <button class="p-3 text-white rounded-md bg-gray-500" @click="toggleAddGuest">
                          Add Guest <font-awesome-icon class="ml-2" :icon="['fas', 'plus']" />
                      </button>
                      </div>
                    </div>
                    

                    <div class='w-full rounded-xl overflow-x-scroll mb-20 min-h-full bg-white'>
                        <div class="table w-full">
                            <div class="w-full table-row-group">
                               
                               <!-- heading row -->
                                <div class="table-row bg-black rounded-xl text-white">
                                    <div class="table-cell">
                                        <div class="m-3">Name</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Room NO.</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Status</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Paid</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Checked In</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Leave Date</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">Action</div>
                                    </div>
                                </div>

                                <!-- end of heading row -->
                            
                                <div v-for="(guest, i) in allGuests" :key="i" class="table-row bg-gray-500 text-white">
                                    
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.fullname }}</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.roomNo }}</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.status }}</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.paid }}</div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.checkIn }} </div>
                                    </div>
                                    <div class="table-cell">
                                        <div class="m-3">{{ guest.leaveDate }}</div>
                                    </div>

                                    <div>
                                        <button v-if="guest.status === 'active'" @click="checkOut(guest)" class="p-2 m-3 bg-green-500">
                                            check-out
                                        </button>
                                    </div>
                        
                                </div>
                                
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <!-- end of second div -->
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        middleware({ $strapi, $auth, redirect }) {
            if($auth.$storage.getCookie("authenticated") === false) {
                redirect('/')
            }
        },
        async asyncData({ $strapi, store }) {
            const guests = await $strapi.$guests.find({
                _sort: 'published_at:DESC'
            })
            store.commit('fetchGuests', guests)

            const rooms = await $strapi.$rooms.find()
            store.commit('fetchRooms', rooms)
        },

        data() {
            return {
                routeName: 'guests',
            }
        },

        methods: {
            ...mapActions(['toggleAddGuest']),

            async checkOut(guest) {
                
                await this.$strapi.$rooms.update(guest.roomNo, {
                    guests: null,
                    occupied: false
                })

                const rooms = await this.$strapi.$rooms.find()
                this.$store.commit('fetchRooms', rooms)

                await this.$strapi.$guests.update(guest.id, {
                    status: 'inactive'
                })

                const guests = await this.$strapi.$guests.find({
                    _sort: 'published_at:DESC'
                }) 
                this.$store.commit('fetchGuests', guests)
            },
           
        },

        computed: {
            ...mapGetters(['addGuest', 'allGuests', 'allRooms'])
        },
    }
</script>

<style scoped>

</style>