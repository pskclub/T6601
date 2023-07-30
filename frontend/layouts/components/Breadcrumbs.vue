<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol role="list" class="flex items-center">
      <li v-for="(breadcrumb, index) in app.breadcrumbs" :key="breadcrumb.name + breadcrumb.to">
        <div v-if="index === 0">
          <nuxt-link :to="breadcrumb.to" class="flex items-center text-gray hover:text-primary">
            <span class="text-sm">{{ breadcrumb.name }}</span>
          </nuxt-link>
        </div>
        <div v-else class="flex items-center">
          <svg
            class="flex-shrink-0 h-5 w-5 mx-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            v-if="breadcrumb.isActive || app.breadcrumbs.length - 1 === index"
            class="text-sm text-primary"
          >
            {{ breadcrumb.name }}
          </span>
          <nuxt-link v-else :to="breadcrumb.to" class="text-sm hover:text-primary">
            {{ breadcrumb.name }}
          </nuxt-link>
        </div>
      </li>
    </ol>
  </nav>
</template>
<script lang="ts" setup>
import { useApp } from '~/hooks/useApp'

const app = useApp()
</script>
