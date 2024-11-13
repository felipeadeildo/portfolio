<script setup lang="ts">
  const colorMode = useColorMode()
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })
</script>

<template>
  <ClientOnly>
    <Button variant="ghost" aria-label="Theme" @click="isDark = !isDark">
      <Icon
        :name="
          isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
        "
        class="size-5"
      />
    </Button>
    <template #fallback>
      <div class="size-5" />
    </template>
  </ClientOnly>
</template>
