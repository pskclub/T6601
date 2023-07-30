<template>
  <div>
    <PageHeader :title="`Your posts (${post.fetchOptions.totalCount})`" />
    <VoteList :post="post" :is-owner="true" />
  </div>
</template>
<script lang="ts" setup>
import { useMyPostPageLoader, usePostPageLoader } from '~/loaders/post.loader'
import VoteList from '~/containers/VoteList.vue'

const allPost = usePostPageLoader()
const post = useMyPostPageLoader()

useWatchTrue(
  () => allPost.addStatus.isSuccess,
  () => {
    post.setFetchItems([allPost.addItem!, ...post.fetchItems])
  }
)
</script>
