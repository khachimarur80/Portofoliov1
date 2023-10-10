<template>
  <v-app>
    <v-app-bar elevation="0" color="teal">
    </v-app-bar>
    <v-main class="overfow-auto">
      <MainFrame v-for="(point, i) in mainPoints" :key="i" :data="point"/>
    </v-main>
  </v-app>
</template>

<script>
import MainFrame from './components/MainFrame.vue'

export default {
  name: 'App',

  components: {
    MainFrame,
  },

  data: () => ({
    mainPoints: [
      {
        'title' : 'Kei Rodríguez Hachimaru',
        'text' : 'Hey, I\'m Kei.',
        'images' : [
          require('@/assets/images/Logo.png')
        ],
      },
      {
        'title' : 'About Me',
        'text' : 'I\'m a first year CS student who lives in Madrid. I enjoy playing the violin, various sports, and of course, coding. I love building and learning stuff!',
        'images' : [
        ],
      },
      {
        'title' : 'My Skills',
        'text' : 'Hey, I\'m Kei.',
        'images' : [],
      }
    ]
  }),
}
</script>

<style>
  body, html {
    height: 100vh;
    width: 100h;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  .frame:nth-child(2n) {
    flex-direction: row-reverse !important;
  }
</style>