<template>
  <hr class="my-2" />
  <div class="flex items-center justify-between text-gray-disabled">
    <p class="mt-1 text-xs">By {{ item.user.username }}</p>
    <p class="mt-1 text-xs">
      {{ TimeHelper.getDateTimeFormTime(item.created_at) }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import { IPostItem } from '~/loaders/post.loader'

defineProps<{
  item: IPostItem
}>()
</script>
