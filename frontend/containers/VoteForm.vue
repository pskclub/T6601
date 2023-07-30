<template>
  <Form @submit="onSubmit">
    <FormFields :options="formFields" />
    <Button class="w-full btn-primary mt-6" type="submit" :is-loading="status.isLoading">
      {{ initialValues ? 'Update' : 'Post' }}
    </Button>
  </Form>
</template>
<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import Button from '~/components/Button.vue'
import { computed } from '#imports'
import { IFormField, INPUT_TYPES } from '~/components/Form/types'
import { IStatus } from '~/lib/api/types'
import { IPostPayload } from '~/loaders/post.loader'

const props = defineProps<{
  status: IStatus
  initialValues?: IPostPayload
}>()

const emits = defineEmits(['submit'])
const form = useForm<IPostPayload>({
  initialValues: props.initialValues,
})

const formFields = computed((): IFormField[] => {
  return [
    {
      type: INPUT_TYPES.TEXT,
      props: {
        label: 'Name',
        name: 'name',
        rules: yup.string().required(),
      },
    },
    {
      type: INPUT_TYPES.TEXT_AREA,
      props: {
        rows: 8,
        label: 'Description',
        name: 'description',
        rules: yup.string(),
      },
    },
  ]
})

const onSubmit = form.handleSubmit((values) => {
  emits('submit', values)
})
</script>
