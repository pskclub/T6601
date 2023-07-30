<template>
  <Modal v-model="isShowVoteModal" title="New Post" class="modal-md">
    <VoteForm :status="post.addStatus" @submit="handlePostSubmit" />
  </Modal>
  <header class="flex h-16 border-b border-gray-900/10 bg-secondary">
    <div class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <div class="flex flex-1 items-center gap-x-6">
        <nuxt-link :href="routes.home.to">
          <img src="/logo.png" alt="" class="h-8 w-auto" />
        </nuxt-link>
      </div>
      <div class="flex flex-1 items-center justify-end gap-x-8">
        <Menu class="relative inline-block text-left" as="div">
          <MenuButton as="p" class="text-primary font-semibold cursor-pointer">
            {{ auth.me.data?.username }}
          </MenuButton>
          <MenuItems
            as="div"
            class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          >
            <div class="p-2">
              <MenuItem>
                <p
                  class="cursor-pointer text-sm hover:text-primary hover:bg-secondary px-3 py-2 rounded-lg"
                  @click="isShowVoteModal = true"
                >
                  New Post
                </p>
              </MenuItem>
              <hr class="mb-3 mt-1" />
              <MenuItem>
                <nuxt-link
                  class="cursor-pointer text-sm hover:text-primary hover:bg-secondary px-3 py-2 rounded-lg text-dark block"
                  :href="routes.myPosts.to"
                >
                  Your Posts
                </nuxt-link>
              </MenuItem>
              <MenuItem @click="auth.logout.run()">
                <p
                  class="cursor-pointer text-sm hover:text-primary hover:bg-secondary px-3 py-2 rounded-lg"
                >
                  Logout
                </p>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </div>
  </header>
</template>
<script lang="ts" setup>
import { useRouter } from '#app'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { useAuth } from '~/hooks/useAuth'
import { useWatchTrue } from '~/hooks/useWatch'
import VoteForm from '~/containers/VoteForm.vue'
import { IPostPayload, usePostPageLoader } from '~/loaders/post.loader'
import { StringHelper } from '~/utils/StringHelper'

const auth = useAuth()
const router = useRouter()
const post = usePostPageLoader()
const dialog = useDialog()
const isShowVoteModal = ref(false)

useWatchTrue(
  () => auth.logout.status.isLoaded,
  () => {
    router.push('/login')
  }
)

const handlePostSubmit = (values: IPostPayload) => {
  post.add(values)
}

useWatchTrue(
  () => post.addStatus.isSuccess,
  () => {
    dialog.success({ title: 'Success', message: 'Post created' }).then(() => {
      isShowVoteModal.value = false
    })
  }
)

useWatchTrue(
  () => post.addStatus.isError,
  () => {
    dialog.error({ title: 'Error', message: StringHelper.getError(post.addStatus.errorData) })
  }
)
</script>
