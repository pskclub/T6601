<template>
  <div class="flex flex-col min-h-full items-center md:justify-center lg:py-16 lg:px-8">
    <div class="mx-auto w-full h-screen md:h-auto md:max-w-[671px] card px-8 py-20 md:px-20">
      <img src="/logo-black.png" alt="" class="mx-auto max-w-[140px] mb-6" />
      <h1 class="font-bold text-3xl text-center">Register</h1>
      <p class="text-center text-gray mt-2">Sign up for using Mhalong</p>
      <div class="mt-8">
        <form class="form" @submit="onSubmit">
          <FormFields :options="formFields" />
          <Button
            class="w-full btn-primary mt-6"
            type="submit"
            :is-loading="register.status.value.isLoading"
            >Sign Up</Button>
          <p class="mt-6 text-gray">
            Already have an account?
            <nuxt-link to="/login" class="underline ml-1">Login</nuxt-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useForm } from 'vee-validate'
import * as yup from 'yup'
import { computed } from '#imports'
import { IFormField, INPUT_TYPES } from '~/components/Form/types'
import Button from '~/components/Button.vue'
import { IRegisterPayload, useRegister } from '~/hooks/useAuth'

interface IForm {
  username: string
  password: string
  confirmPassword: string
}

const router = useRouter()
const register = useRegister()
const form = useForm<IForm>()
const dialog = useDialog()

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
        rules: yup.string().required().min(8),
      },
    },
    {
      type: INPUT_TYPES.PASSWORD,
      props: {
        label: 'Confirm Password',
        name: 'confirmPassword',
        placeholder: 'ยืนยันรหัสผ่าน',
        rules: yup
          .string()
          .required()
          .test('not_match_password', 'กรุณากรอกยืนยันรหัสผ่านให้ตรงกัน', (value?: string) => {
            return value === form.values.password
          }),
      },
    },
  ]
})

const onSubmit = form.handleSubmit((values: IRegisterPayload) => {
  register.run(values)
})

useWatchTrue(
  () => register.status.value.isSuccess,
  () => {
    dialog
      .success({
        title: 'สมัครสมาชิกสำเร็จ',
        message: 'คุณสามารถเข้าสู่ระบบได้เลย',
      })
      .then(() => {
        router.push(routes.login.to)
      })
  }
)

useWatchTrue(
  () => register.status.value.isError,
  () => {
    dialog.error({
      title: 'ไม่สามารถสมัครสมาชิกได้',
      message: StringHelper.getError(register.status.value.errorData),
    })
  }
)
</script>
