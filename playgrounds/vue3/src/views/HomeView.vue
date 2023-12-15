<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
import { useMouse } from '@mewcoder/vhooks';
import Coordinate from '@/components/Coordinate.vue';

const { x, y } = useMouse();
</script>

<template>
  <main>
    <HelloWorld msg="Vue2" />
    <Coordinate label="X" :value="x" />
    <Coordinate label="Y" :value="y" />
  </main>
</template>
