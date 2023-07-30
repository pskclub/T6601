<template>
  <div class="tabs">
    <nav class="tab-header">
      <div :class="['tab-header-container', tabClass]">
        <div
          v-for="(option, index) in options.tabs"
          :key="`tab-${index}`"
          :class="['tab-item', { active: activeIndex === index }]"
          @click.prevent="handleChangeTab(index)"
        >
          <div
            :class="[
              'tab-item-inner hover:text-primary-600',
              activeIndex === index ? 'text-primary-600' : 'text-gray',
            ]"
          >
            <i v-if="!!option.icon" :class="`mr-2 ic ic-${option.icon}`" />
            <template v-if="typeof option.label === 'string'">
              {{ option.label }}
            </template>
            <div v-else class="flex"><component :is="option.label" /></div>
          </div>
        </div>
      </div>
      <slot name="right" />
    </nav>
    <div class="tab-panel">
      <div v-if="options.isRenderOnActive" :class="[bodyClass]">
        <div class="tab-pane active" role="tabpanel">
          <component :is="options.tabs[activeIndex].component" />
        </div>
      </div>
      <div v-for="(option, key) in options.tabs" v-else :key="option.value" :class="[bodyClass]">
        <div v-show="activeIndex === key" class="tab-pane active" role="tabpanel">
          <slot :change-tab="handleChangeTab" :option="option" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ITabOptions } from '~/components/Tab/types'

const props = withDefaults(
  defineProps<{
    value?: number
    options: ITabOptions
    bodyClass?: ClassName
    tabClass?: ClassName
  }>(),
  {
    value: 0,
  }
)

const activeIndex = ref<number>(props.value)

const handleChangeTab = (key: number) => {
  activeIndex.value = key
}

const emit = defineEmits({
  'update:modelValue': (value: number) => true,
})

watch(
  () => props.value,
  (value) => {
    activeIndex.value = value
  }
)

watch(
  () => activeIndex.value,
  (value) => {
    emit('update:modelValue', value)
  }
)
</script>
