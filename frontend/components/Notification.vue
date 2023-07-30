<template>
  <ClientOnly>
    <notifications classes="notification" position="top right">
      <template #body="{ close, item }">
        <div :class="['notification', item.type === 'error' ? 'danger' : item.type]">
          <div class="notification-title">
            <div class="notification-title-inner">
              <div class="notification-icon-container">
                <em
                  v-if="item.data?.icon"
                  :class="[`ic ic-${item.data?.icon} notification-icon`]"
                />
                <template v-else>
                  <em
                    v-if="item.type === 'success'"
                    class="ic ic-check-circle-solid notification-icon"
                  />
                  <em
                    v-if="item.type === 'info'"
                    class="ic ic-info-circle-solid notification-icon"
                  />
                  <em
                    v-if="item.type === 'warning'"
                    class="ic ic-exclamation-triangle-solid notification-icon"
                  />
                  <em v-if="item.type === 'error'" class="ic ic-x-circle-solid notification-icon" />
                </template>
              </div>
              <p>{{ item.title }}</p>
            </div>
            <div class="notification-content" v-html="item.text" />
          </div>
          <em class="ic ic-x-mark-solid cursor-pointer close" @click="close" />
        </div>
      </template>
    </notifications>
  </ClientOnly>
</template>
