

export const state = () => ({
    addGuest: false,
    allGuests: [],
    allRooms: []
})

export const getters = {
    addGuest: state => state.addGuest,

    // retrieve all guests from state
    allGuests: state => state.allGuests,

    // retrieve all rooms from state
    allRooms: state => state.allRooms,
    
}

export const actions = {
    toggleAddGuest({ commit }) {
        commit('toggleAddGuest')
    }
}

export const mutations = {
    toggleAddGuest(state) {
        state.addGuest = !state.addGuest
    },

    fetchGuests(state, guests) {
        state.allGuests = guests
    },

    fetchRooms(state, rooms) {
        state.allRooms = rooms
    },

    updateGuests(state, guest) {
        state.allGuests.unshift(guest)
    },

    updateRoom(state, data) {
        const { guest, active, room } = data
        const curRoom = state.allRooms.find(el => 
            el.id === room.id
        )

        state.allRooms[curRoom].guest = guest
        state.allRooms[curRoom].active = active
    }


}
