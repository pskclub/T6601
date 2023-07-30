<template>
  <div class="root-container">
    <Dialog />
    <Notification />
    <slot />
  </div>
</template>
<script lang="ts" setup>
import Dialog from '~/components/Dialog.vue'
import Notification from '~/components/Notification.vue'
</script>
