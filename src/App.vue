<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <b-alert variant="success" show>Success Alert</b-alert>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
