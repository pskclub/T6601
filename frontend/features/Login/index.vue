<template>
  <div class="flex flex-col min-h-full items-center md:justify-center lg:py-16 lg:px-8">
    <div class="mx-auto w-full h-screen md:h-auto md:max-w-[671px] card px-8 py-20 md:px-20">
      <img src="/logo-black.png" alt="" class="mx-auto max-w-[140px] mb-6" />
      <h1 class="font-bold text-3xl text-center">Welcome back!</h1>
      <p class="text-center text-gray mt-2">Sign in to continue using Mhalong</p>
      <div class="mt-8">
        <Form class="form" @submit="onSubmit">
          <FormFields :options="formFields" />
          <Button
            class="w-full btn-primary mt-6"
            type="submit"
            :is-loading="auth.login.status.isLoading"
          >
            Sign In
          </Button>
          <p class="mt-6 text-gray">
            Don’t have an account?
            <nuxt-link to="/register" class="underline ml-1">Register</nuxt-link>
          </p>
        </Form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { useAuth } from '~/hooks/useAuth'
import { computed } from '#imports'
import { IFormField, INPUT_TYPES } from '~/components/Form/types'
import Button from '~/components/Button.vue'

interface IForm {
  username: string
  password: string
}

const auth = useAuth()
const dialog = useDialog()
const router = useRouter()
const form = useForm<IForm>()

const formFields = computed((): IFormField[] => {
  return [
    {
      type: INPUT_TYPES.TEXT,
      props: {
        label: 'Username',
        name: 'username',
        rules: yup.string().required(),
      },
    },
    {
      type: INPUT_TYPES.PASSWORD,
      props: {
        label: 'Password',
        name: 'password',
        placeholder: 'รหัสผ่าน',
        rules: yup.string().required(),
      },
    },
  ]
})

const onSubmit = form.handleSubmit((values) => {
  auth.login.run(values)
})

useWatchTrue(
  () => auth.login.status.isSuccess,
  () => {
    router.push(routes.home.to)
  }
)

useWatchTrue(
  () => auth.login.status.isError,
  () => {
    dialog.error({
      title: 'ไม่สามารถเข้าสู่ระบบได้',
      message: StringHelper.getError(auth.login.status.errorData),
    })
  }
)
</script>
