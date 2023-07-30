<template>
  <div
    :class="[
      'alert',
      {
        'alert-success': type === 'success',
        'alert-danger': type === 'danger',
        'alert-warning': type === 'warning',
        'alert-info': type === 'info',
      },
    ]"
  >
    <span v-if="!icon">
      <em v-if="type === 'success'" :class="['ic ic-check-circle-solid alert-icon']" />
      <em v-if="type === 'warning'" :class="['ic ic-exclamation-triangle-solid alert-icon']" />
      <em v-if="type === 'danger'" :class="['ic ic-x-circle-solid alert-icon']" />
      <em v-if="type === 'info'" :class="['ic ic-info-circle-solid alert-icon']" />
    </span>

    <em v-else :class="[`ic ic-${icon} alert-icon`]" />
    <div class="alert-body">
      <p v-if="title" class="alert-title">
        {{ title }}
      </p>
      <div v-if="text" class="alert-text">
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    text?: string
    title?: string
    icon?: string
    type?: 'success' | 'warning' | 'danger' | 'info'
  }>(),
  { type: 'success' }
)
</script>
