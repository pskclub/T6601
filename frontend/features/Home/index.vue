<template>
  <div>
    <PageHeader :title="`All posts (${post.fetchOptions.totalCount})`" />
    <VoteList :post="post" />
  </div>
</template>
<script lang="ts" setup>
import { usePostPageLoader } from '~/loaders/post.loader'
import VoteList from '~/containers/VoteList.vue'

const post = usePostPageLoader()
</script>
