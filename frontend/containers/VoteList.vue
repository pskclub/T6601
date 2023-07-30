<template>
  <div>
    <div class="flex items-center justify-between">
      <Menu class="relative inline-block text-left" as="div">
        <MenuButton
          as="button"
          class="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          Sort <i class="ic ic-chevron-down-solid ml-2" />
        </MenuButton>
        <MenuItems
          as="div"
          class="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
        >
          <div class="p-2 space-y-1">
            <MenuItem v-for="sort in sortOptions" :key="sort.value">
              <p
                :class="[
                  'cursor-pointer text-sm hover:text-primary hover:bg-secondary px-3 py-2 rounded-lg',
                  {
                    'bg-secondary text-primary': sort.value === sortActive,
                  },
                ]"
                @click="onSort(sort.value)"
              >
                {{ sort.label }}
              </p>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
      <Form class="ml-auto md:max-w-[250px] mb-8" @submit="onSearch">
        <FormFields :form="formSearch" :options="searchFormFields" />
      </Form>
    </div>

    <Loader :is-loading="post.fetchStatus.isLoading">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-4">
        <VoteItem
          v-for="item in post.fetchItems"
          :key="item.id"
          :item="item"
          :is-owner="isOwner"
          @voted="handleVoted"
          @toggle-close="handleToggleClose"
          @delete="handleDelete"
          @update="handleUpdate"
        />
      </div>
    </Loader>
    <ClientOnly>
      <InfiniteLoading class="w-full" @infinite="infiniteHandler">
        <template #spinner>
          <Loader :is-loading="post.fetchNextPageStatus.isLoading" />
        </template>
        <template #complete>
          {{ ' ' }}
        </template>
      </InfiniteLoading>
    </ClientOnly>
  </div>
</template>
<script lang="ts" setup>
import InfiniteLoading from 'v3-infinite-loading'
import { useForm } from 'vee-validate'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { IPostItem, useMyPostPageLoader, usePostPageLoader } from '~/loaders/post.loader'
import { INPUT_TYPES } from '~/components/Form/types'
import VoteItem from '~/containers/VoteItem.vue'

const props = defineProps<{
  post: ReturnType<typeof usePostPageLoader> | ReturnType<typeof useMyPostPageLoader>
  isOwner?: boolean
}>()

const currentState = ref<any>(null)
const sortActive = ref<string>('posts.created_at DESC')
const sortOptions = [
  ObjectHelper.createOption('posts.created_at DESC', 'Newest'),
  ObjectHelper.createOption('count(post_votes.id) DESC', 'Most votes'),
]

const formSearch = useForm()

props.post.setFetchLoading()
onMounted(() => {
  props.post.fetch(1, '', {
    params: {
      order_by: sortActive.value,
    },
  })
})

const handleVoted = (_post: IPostItem) => {
  const newPost = props.post.fetchItems.map((item) => {
    if (item.id === _post.id) {
      return _post
    }

    return item
  })

  props.post.setFetchItems(newPost)
}

const handleToggleClose = (_post: IPostItem) => {
  const newPost = props.post.fetchItems.map((item) => {
    if (item.id === _post.id) {
      return _post
    }

    return item
  })

  props.post.setFetchItems(newPost)
}

const handleDelete = (_post: IPostItem) => {
  const newPost = props.post.fetchItems.filter((item) => item.id !== _post.id)

  props.post.setFetchItems(newPost)
}

const handleUpdate = (_post: IPostItem) => {
  const newPost = props.post.fetchItems.map((item) => {
    if (item.id === _post.id) {
      return _post
    }

    return item
  })

  props.post.setFetchItems(newPost)
}

const onSort = (option: string) => {
  sortActive.value = option
  props.post.fetch(1, formSearch.values.search, {
    params: {
      order_by: option,
    },
  })
}

const onSearch = formSearch.handleSubmit((values) => {
  props.post.fetch(1, values.search, {
    params: {
      order_by: sortActive.value,
    },
  })
})

const searchFormFields = createFormFields(() => [
  {
    type: INPUT_TYPES.TEXT,
    props: {
      class: 'mb-0',
      name: 'search',
      placeholder: 'ค้นหา...',
      isShowConfirmButton: true,
      confirmText: '<i class="ic ic-search-solid"/>',
    },
    on: {
      submit: () => {
        onSearch()
      },
    },
  },
])

const infiniteHandler = ($state: any) => {
  if (props.post.fetchStatus.isLoading) {
    return
  }

  if (props.post.fetchOptions.currentPage === props.post.fetchOptions.totalPage) {
    $state.complete()
  } else {
    props.post.fetchNextPage({
      params: {
        q: formSearch.values.search,
        order_by: sortActive.value,
      },
    })

    currentState.value = $state
  }
}

useWatchTrue(
  () => props.post.fetchStatus.isLoaded,
  () => {
    currentState.value?.loaded()
    currentState.value = null
  }
)
</script>
