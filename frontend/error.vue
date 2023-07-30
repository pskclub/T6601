<template>
  <div class="h-full">
    <div v-if="+error.statusCode === 404" class="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main
        class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex-shrink-0 flex justify-center">
          <nuxt-link to="/" class="inline-flex">
            <img class="h-12 w-auto" src="/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="py-16">
          <div class="text-center">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">404 error</p>
            <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Page not found.
            </h1>
            <p class="mt-2 text-base text-gray-500">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div class="mt-6">
              <nuxt-link to="/" class="text-base font-medium text-primary hover:text-primary">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div v-if="+error.statusCode === 403" class="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main
        class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex-shrink-0 flex justify-center">
          <nuxt-link to="/" class="inline-flex">
            <img class="h-12 w-auto" src="/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="py-16">
          <div class="text-center">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">403 error</p>
            <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Forbidden.
            </h1>
            <p class="mt-2 text-base text-gray-500">
              Sorry, you don't have permission to access this page.
            </p>
            <div class="mt-6">
              <nuxt-link to="/" class="text-base font-medium text-primary hover:text-primary">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
    </div>
    <div v-else class="min-h-full pt-16 pb-12 flex flex-col bg-white">
      <main
        class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex-shrink-0 flex justify-center">
          <nuxt-link to="/" class="inline-flex">
            <img class="h-12 w-auto" src="/logo.png" alt="" />
          </nuxt-link>
        </div>
        <div class="py-16">
          <div class="text-center">
            <p class="text-sm font-semibold text-primary uppercase tracking-wide">
              {{ error.statusCode }} error
            </p>
            <h1 class="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
              Something went wrong
            </h1>
            <p class="mt-2 text-base text-gray-500">
              {{ error.message }}
            </p>
            <div class="mt-6">
              <nuxt-link to="/" class="text-base font-medium text-primary hover:text-primary">
                Go back home<span aria-hidden="true"> &rarr;</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>
