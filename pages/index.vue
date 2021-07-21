


<template>
  <div>
    <Loading v-if="loading" />
    <Login v-if="!loading"/>
  </div>
</template>

<script>
import Loading from '~/components/Loading.vue'
export default {
  components: { Loading },

  middleware({ $auth, redirect }) {
    if($auth.$storage.getCookie("authenticated") === true) {
        redirect('/dashboard/guests')
    }
  },

  data() {
    return {
      loading: true,
      timeout: Math.floor(Math.random() * 1000),
    }
  },

  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, this.timeout)
  }

}
</script>
