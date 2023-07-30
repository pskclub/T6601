<template>
  <nuxt-link
    v-if="type === 'link'"
    :class="['btn', className, { 'btn-icon': isOnlyIcon }, { disabled: isDisabled || isLoading }]"
    :disabled="isDisabled || isLoading"
    :target="target"
    :title="title"
    :to="href"
  >
    <Loading v-if="isLoading" :class="['h-5 w-5 animate-spin', { 'mr-2': !isOnlyIcon }]" />
    <span
      v-if="icon && !isLoading"
      :class="[`ic ic-${icon}`, { 'mr-2': !isOnlyIcon }, `ic ic-${icon}`]"
    />
    <slot v-if="!isOnlyIcon" />
  </nuxt-link>
  <button
    v-else
    :class="['btn', className, { 'btn-icon': isOnlyIcon }, { disabled: isDisabled || isLoading }]"
    :disabled="isDisabled || isLoading"
    :title="title"
    :type="type"
  >
    <Loading v-if="isLoading" :class="['h-5 w-5 animate-spin', { 'mr-2': !isOnlyIcon }]" />
    <span
      v-if="icon && !isLoading"
      :class="[`ic ic-${icon}`, { 'mr-2': !isOnlyIcon }, `ic ic-${icon}`]"
    />
    <slot v-if="!isOnlyIcon" />
  </button>
</template>

<script lang="ts" setup>
import Loading from '~/components/icon/Loading.vue'
import { toRef } from '#imports'

const props = withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset' | 'link'
    class?: ClassName
    title?: string
    href?: string
    icon?: string
    target?: '_blank' | '_self' | '_parent' | '_top'
    isDisabled?: boolean
    isLoading?: boolean
    isOnlyIcon?: boolean
  }>(),
  {
    type: 'button',
  }
)

const className = toRef(props, 'class')
</script>
