import * as yup from 'yup'
import 'yup-password'
import 'yup-phone'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  yup.addMethod(yup.string, 'english', function () {
    return this.matches(/^[A-Za-z]+$/, 'ระบุเป็นภาษาอังกฤษเท่านั้น')
  })

  yup.addMethod(yup.string, 'thai', function () {
    return this.matches(/^[ก-๙]+$/, 'ระบุเป็นภาษาไทยเท่านั้น')
  })

  yup.addMethod(yup.string, 'numeric', function () {
    return this.matches(/^[\d]+$/, 'ระบุเป็นตัวเลขเท่านั้น')
  })

  yup.addMethod(yup.string, 'len', function (len: number, errorMessage?: string) {
    return this.test(
      'len',
      errorMessage ?? `กรุณากรอกข้อมูลให้ครบ ${len} หลัก`,
      (value?: string) => {
        if (!value) return true

        return value.length === len
      }
    )
  })

  yup.addMethod(yup.string, 'phoneLen', function (len: number, errorMessage?: string) {
    return this.test('beginWithZero', 'หมายเลขโทรศัพท์ต้องขึ้นต้นด้วย 0', (value?: string) => {
      if (!value) return true

      return value[0] === '0'
    }).len(len, errorMessage)
  })

  yup.setLocale({
    mixed: {
      required: (obj) => 'กรุณากรอกข้อมูล',
      notType: (obj) => 'ข้อมูลไม่ถูกต้อง',
      oneOf: (obj) => 'ไม่พบข้อมูลดังกล่าว',
      notOneOf: (obj) => 'ไม่พบข้อมูลดังกล่าว',
      defined: (obj) => 'ไม่พบข้อมูลดังกล่าว',
    },
    string: {
      length: ({ length }) => `กรุณากรอกข้อมูลที่มีความยาวเท่ากับ ${length} ตัวอักษร`,
      min: ({ min }) => `กรุณากรอกข้อมูลมากกว่า ${min} ตัวอักษร`,
      max: ({ max }) => `กรุณากรอกข้อมูลน้อยกว่า ${max} ตัวอักษร`,
      email: 'กรุณากรอกอีเมลที่ถูกต้อง',
      url: 'กรุณากรอก URL ที่ถูกต้อง',
      trim: 'กรุณาอย่าเว้นวรรคหน้าหรือหลังข้อความ',
      lowercase: 'กรุณากรอกข้อความเป็นตัวพิมพ์เล็ก',
      uppercase: 'กรุณากรอกข้อความเป็นตัวพิมพ์ใหญ่',
      uuid: ({ regex }) => 'กรุณากรอก uuid ให้ถูกต้อง',
    },

    number: {
      min: ({ min }) => `กรุณากรอกตัวเลขที่มากกว่าหรือเท่ากับ ${min}`,
      max: ({ max }) => `กรุณากรอกตัวเลขที่น้อยกว่าหรือเท่ากับ ${max}`,
      lessThan: ({ less }) => `กรุณากรอกตัวเลขที่น้อยกว่า ${less}`,
      moreThan: ({ more }) => `กรุณากรอกตัวเลขที่มากกว่า ${more}`,
      positive: 'กรุณากรอกตัวเลขที่เป็นบวก',
      negative: 'กรุณากรอกตัวเลขที่เป็นลบ',
      integer: 'กรุณากรอกเฉพาะตัวเลขเต็ม',
    },
    date: {
      min: ({ min }) => `กรุณาเลือกวันที่ที่หลังหรือเท่ากับ ${min}`,
      max: ({ max }) => `กรุณาเลือกวันที่ที่ก่อนหรือเท่ากับ ${max}`,
    },
    array: {
      length: ({ length }) => `กรุณาเลือก ${length} รายการ`,
      min: ({ min }) => `กรุณาเลือกอย่างน้อย ${min} รายการ`,
      max: ({ max }) => `กรุณาเลือกไม่เกิน ${max} รายการ`,
    },
    object: {
      noUnknown: (obj) => 'ข้อมูลไม่ถูกต้อง',
    },
    boolean: {
      isValue: (obj) => 'ข้อมูลไม่ถูกต้อง',
    },
  })
})
