
<template>
    <div class="p-10 shadow-xl shadow-yellow-300 w-3/4 sm:w-1/2 rounded-xl max-h-screen">
        <div class="m-2">
            <h1 class="font-black text-yellow-800">New Guest</h1>
        </div>

        <div>
            <form @submit.prevent="newGuest">

                <div class="p-2 text-sm">
                    <label class="font-bold text-yellow-800 text-sm" for="checkin">FullName</label>
                    <input v-model="fullname" type="text" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
                </div>

                <div class="p-2 text-sm">
                    <label class="font-bold text-yellow-800 text-sm" for="checkin">Email</label>
                    <input v-model="email" type="email" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
                </div>

                <!-- check in and check out -->
                <div class="p-2">
                    <div class="mb-3 text-sm">
                        <label class="font-bold text-yellow-800" for="checkin">Check In</label>
                        <input v-model="checkIn" id="checkin" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" type="date">
                    </div>
                    <div class="text-sm">
                        <label class="font-bold text-yellow-800 text-sm" for="leavedate">Leave Date</label>
                        <input v-model="leaveDate" id="leavedate" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" type="date">
                    </div>
                </div>
                
                <div class="text-sm p-2">
                    <label for="rooms" class="text-sm text-yellow-800 font-bold">Select Room</label>
                    <select v-model="RoomNo" id="rooms" name="" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
                        <option v-for="(room, i) in allRooms.filter(el => el.occupied === false).map(el => el.roomNo)" :key="i" :value="room">{{ room }}</option>
                    </select>
                </div>

                <div class="my-3">
                    <button class="p-3 bg-green-500 text-white" type="submit">
                        Submit 
                    </button>
                    <button class="p-3 bg-red-500 text-white" @click.prevent="toggleAddGuest">
                        Cancel 
                    </button>
                </div>
                
            </form>
        </div>

    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    export default {
        name: 'AddGuest',

        data() {
            return {
                fullname: '',
                RoomNo: '',
                checkIn: '',
                leaveDate: '',
                email: ''
            }
        },

        computed: {
            ...mapGetters(['allRooms'])
        },

        methods: {

            async newGuest() {

                const newGuest = {
                    fullname: this.fullname,
                    checkIn: this.checkIn,
                    leaveDate: this.leaveDate,
                    roomNo: parseInt(this.RoomNo),
                    status: 'active',
                    paid: true,
                    email: this.email
                }

                const { guest } = await this.$strapi.$guests.create(newGuest)

                console.log("guest", guest)

                await this.$strapi.$rooms.update(this.RoomNo, {
                    occupied: true,
                    guest
                })

                this.$store.commit('updateGuests', guest)

                const rooms = await this.$strapi.$rooms.find()

                this.$store.commit('fetchRooms', rooms)

                this.toggleAddGuest()
            },

            ...mapActions(['toggleAddGuest',])
        }
    }
</script>

<style scoped>

</style>