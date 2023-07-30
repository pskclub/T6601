<template>
  <div>
    <hr class="mb-3 mt-3" />
    <div class="flex items-center space-x-3 justify-between">
      <SwitchGroup @click.stop>
        <div class="flex items-center gap-2 ml-2">
          <Switch
            :model-value="item.is_closed"
            :class="['switch-control cursor-pointer', !item.is_closed ? 'active' : 'inactive']"
            @update:model-value="$emit('toggle-close')"
          >
            <span
              :class="[
                'switch-control-inner',
                !item.is_closed ? 'translate-x-5 bg-primary' : 'translate-x-1 bg-gray-300',
              ]"
              aria-hidden="true"
            />
          </Switch>
        </div>
      </SwitchGroup>
      <div class="flex items-center space-x-3">
        <Button
          icon="pencil"
          class="btn-warning btn-sm"
          :is-only-icon="true"
          :is-disabled="item.vote_count > 0"
          @click.stop="$emit('show-update-modal')"
        />
        <Button
          icon="trash-solid"
          class="btn-danger btn-sm"
          :is-only-icon="true"
          :is-disabled="item.vote_count > 0"
          @click.stop="handleDelete"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Switch, SwitchGroup } from '@headlessui/vue'
import { IPostItem } from '~/loaders/post.loader'

const emits = defineEmits(['toggle-close', 'delete', 'update', 'show-update-modal'])
const props = defineProps<{
  item: IPostItem
}>()

const dialog = useDialog()

const handleDelete = () => {
  dialog
    .warning({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      isShowCancelBtn: true,
    })
    .then(() => {
      emits('delete')
    })
}
</script>
