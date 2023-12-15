<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
}>();
</script>

<template>
  <div>
    <span>Mouse {{ label }}</span>
    <span>{{ value }}</span>
  </div>
</template>
