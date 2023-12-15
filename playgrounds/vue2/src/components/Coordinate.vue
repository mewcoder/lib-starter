<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
}>();
</script>

<template>
  <div>
    <span>{{ value }}</span>
    <span>Mouse {{ label }}</span>
  </div>
</template>
