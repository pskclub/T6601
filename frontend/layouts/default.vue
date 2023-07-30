<template>
  <Navbar />
  <div class="container py-10">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import Navbar from '~/layouts/components/Navbar.vue'

const auth = useAuth()
const router = useRouter()

useWatchTrue(
  () => auth.logout.status.isLoaded,
  () => {
    router.push(routes.login.to)
  }
)
</script>
