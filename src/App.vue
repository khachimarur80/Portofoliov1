<template>
  <div id="app">
    <header>
      <!-- Your header content goes here -->
    </header>

    <router-view></router-view>

    <footer>
      <!-- Your footer content goes here -->
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route: {
        immediate: true,
        handler(to) {
            document.title = to.meta.title || 'Kei';
        }
    },
  }
}
</script>