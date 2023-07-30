<template>
  <div>
    <Modal v-model="isShowEditModal" :title="item.name" class="modal-md">
      <VoteForm :status="post.updateStatus" :initial-values="item" @submit="handleUpdate" />
    </Modal>
    <Modal v-model="isShowModal" class="modal-md">
      <VoteItemHeader
        :item="item"
        :vote-status="vote.status.value"
        :is-long-title="true"
        :is-owner="isOwner"
        class="mt-14"
        @vote="handleVote"
      />
      <p class="mt-2 text-gray text-sm min-h-[80px] whitespace-pre-line">{{ item.description }}</p>
      <VoteItemBottom :item="item" />
      <VoteItemManage
        v-if="isOwner"
        :item="item"
        @toggle-close="handleToggleClose"
        @delete="handleDelete"
        @update="handleUpdate"
        @show-update-modal="
          () => {
            isShowModal = false
            isShowEditModal = true
          }
        "
      />
    </Modal>
    <div class="card p-4 cursor-pointer" @click="isShowModal = true">
      <VoteItemHeader
        :item="item"
        :vote-status="vote.status.value"
        :is-owner="isOwner"
        @toggle-close="handleToggleClose"
        @vote="handleVote"
      />
      <p class="mt-2 line-clamp-2 text-gray text-sm h-[40px]" :title="item.description">
        {{ item.description }}
      </p>
      <VoteItemBottom :item="item" />
      <VoteItemManage
        v-if="isOwner"
        :item="item"
        @toggle-close="handleToggleClose"
        @delete="handleDelete"
        @update="handleUpdate"
        @show-update-modal="isShowEditModal = true"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {
  IPostItem,
  IPostPayload,
  useVoteLoader,
  useVoteToggleCloseLoader,
} from '~/loaders/post.loader'
import { useWatchTrue } from '~/hooks/useWatch'
import VoteItemHeader from '~/containers/VoteItemHeader.vue'
import VoteItemBottom from '~/containers/VoteItemBottom.vue'
import VoteItemManage from '~/containers/VoteItemManage.vue'
import { StringHelper } from '~/utils/StringHelper'
import VoteForm from '~/containers/VoteForm.vue'

const emits = defineEmits(['voted', 'toggle-close', 'delete', 'update'])
const props = defineProps<{
  item: IPostItem
  isOwner?: boolean
}>()

const isShowModal = ref(false)
const dialog = useDialog()
const vote = useVoteLoader(props.item.id)
const toggle = useVoteToggleCloseLoader(props.item.id)
const post = usePostPageLoader()
const isShowEditModal = ref(false)

const handleVote = () => {
  vote.run()
}

const handleDelete = () => {
  post.remove(props.item.id)
}

const handleUpdate = (values: IPostPayload) => {
  post.update(props.item.id, values)
}

const handleToggleClose = () => {
  toggle.run({
    is_closed: !props.item.is_closed,
  })
}

useWatchTrue(
  () => vote.status.value.isSuccess,
  () => {
    emits('voted', vote.data.value)
  }
)

useWatchTrue(
  () => vote.status.value.isError,
  () => {
    dialog.error({
      title: 'ไม่สามารถโหวตได้',
      message: StringHelper.getError(vote.status.value.errorData),
    })
  }
)

useWatchTrue(
  () => toggle.status.value.isSuccess,
  () => {
    emits('toggle-close', toggle.data.value)
  }
)

useWatchTrue(
  () => toggle.status.value.isError,
  () => {
    dialog.error({
      title: 'ไม่สามารถเปิด/ปิดโหวตได้',
      message: StringHelper.getError(toggle.status.value.errorData),
    })
  }
)

useWatchTrue(
  () => post.deleteStatus.isSuccess,
  () => {
    dialog
      .success({
        title: 'ลบโพสต์สำเร็จ',
        message: 'โพสต์ของคุณถูกลบแล้ว',
      })
      .finally(() => {
        emits('delete', props.item)
      })
  }
)

useWatchTrue(
  () => post.deleteStatus.isError,
  () => {
    dialog.error({
      title: 'ไม่สามารถลบโพสต์ได้',
      message: StringHelper.getError(post.deleteStatus.errorData),
    })
  }
)

useWatchTrue(
  () => post.updateStatus.isSuccess,
  () => {
    dialog
      .success({
        title: 'Success',
        message: 'Update item successfully',
      })
      .then(() => {
        isShowEditModal.value = false
        emits('update', post.updateItem)
      })
  }
)

useWatchTrue(
  () => post.updateStatus.isError,
  () => {
    dialog.error({ title: 'Fail', message: StringHelper.getError(post.updateStatus.errorData) })
  }
)
</script>
