<template>
  <div class="flex justify-between items-center">
    <div class="flex items-center">
      <p
        :class="[
          'text-primary text-xl font-bold mt-[2px] ',
          {
            'line-clamp-1': !isLongTitle,
          },
        ]"
        :title="item.name"
      >
        {{ item.name }}
      </p>
      <p v-if="item.is_closed" class="text-white bg-gray px-3 py-1 rounded-lg text-xs ml-3">
        CLOSED
      </p>
    </div>
    <Button
      :is-loading="voteStatus.isLoading"
      :class="[
        'font-bold text-primary text-sm ring-1 ring-primary px-3 h-[30px] ml-3',
        {
          'bg-primary text-white': item.is_voted,
          'hover:bg-primary hover:text-white': !item.is_voted || !item.is_closed,
        },
      ]"
      :is-disabled="item.is_voted || item.is_closed"
      @click.stop="$emit('vote')"
    >
      {{ item.vote_count }} Votes
    </Button>
  </div>
</template>
<script lang="ts" setup>
import { IPostItem } from '~/loaders/post.loader'
import { IStatus } from '~/lib/api/types'

defineEmits(['vote'])
defineProps<{
  item: IPostItem
  voteStatus: IStatus
  isOwner?: boolean
  isLongTitle?: boolean
}>()
</script>
