<script setup lang="ts"></script>

<template>
  <div id="app">
    <header>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </header>

    <router-view />
  </div>
</template>
