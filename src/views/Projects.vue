<template>
  <v-app >
    <v-app-bar elevation="0" color="teal">
      <v-spacer>
      </v-spacer>
      <v-btn href="/">
        Inicio
      </v-btn>
      <v-spacer>
      </v-spacer>
    </v-app-bar>
    <v-main @scroll="handleScroll" id="main">
      <div class="text-h4 py-6 px-3" id="projects">
        Proyectos
      </div>
      <MainFrame v-for="(point, i) in projects" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      
      <v-btn
        v-if="showButton"
        class="scroll-to-top"
        color="teal-lighten-2"
        fab
        icon
        outlined
        @click="scrollToTop"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
      <div class="py-10">
      </div>
      <v-footer color="teal" class="text-center d-flex flex-column" absolute bottom>
        <div>
          <v-btn
            v-for="(button, index) in socials"
            :key="index"
            :href="button.href"
            target="_blank"
            icon
            class="mx-3"
            color="teal"
          >
            <v-img
              :src="button.icon"
              height="30"
              width="30"
              :alt="button.alt"
            ></v-img>
          </v-btn>
        </div>
        <br>
        <span>{{ new Date().getFullYear() }} — <strong>Kei</strong></span>
      </v-footer>
    </v-main>
  </v-app>
</template>

<script>
import MainFrame from '../components/MainFrame.vue'


export default {
  name: 'ProjectsView',

  components: {
    MainFrame,
  },

  data: () => ({
    socials: [
      {
        href: "mailto:khachimarur80@gmail.com",
        icon: require("@/assets/images/gmail.png"),
        alt: "Gmail icon",
      },
      {
        href: "https://github.com/khachimarur80",
        icon: require("@/assets/images/github.png"),
        alt: "GitHub icon",
      },
      {
        href: "https://linkedin.com/redirect-here",
        icon: require("@/assets/images/linkedin.png"),
        alt: "LinkedIn icon",
      },
      {
        href: "https://instagram.com/krhachimaru",
        icon: require("@/assets/images/instagram.png"),
        alt: "Instagram icon",
      },
    ],
    projects: [
      {
        'show': false,
        'title': 'Luhmann',
        'text': 'Es una plataforma donde las personas pueden compartir sus conocimientos y trabajar juntas. Los datos se almacenan en un nodo de árbol, donde los conceptos más grandes incluyen a los más pequeños. Una característica genial es que utiliza la tecnología WebSocket para trabajar simultáneamente.',
        'images': [
          require('@/assets/images/Luhmann.png')
        ],
        'more': ['Ver Más', 'https://khachimarur80.github.io/Luhmann/'],
        'repo': 'https://github.com/khachimarur80/Luhmann',
      },
      {
        'show': false,
        'title': 'Diamond',
        'text': 'Aplicación de escritorio construida con Electron.js. Es un editor de texto simple pero efectivo. Un editor de texto para tu markdown, con vista previa en tiempo real. Es una copia de "Obsidian".',
        'images': [
          require('@/assets/images/Diamond.png'),
        ],
        'more': ['Ver Más', 'https://khachimarur80.github.io/Diamond/'],
        'repo': 'https://github.com/khachimarur80/MindMap',
      },
      {
        'show': false,
        'title': 'Koding',
        'text': 'Es una plataforma donde los estudiantes de informática comparten código, tutoriales, notas y aprenden juntos. Los estudiantes más experimentados pueden enseñar a los usuarios menos experimentados y ganar puntos. ¡También incluye un editor de código en línea para los cursos predeterminados!',
        'images': [
          require('@/assets/images/Koding.png')
        ],
        'more': ['Ver Más', '#'],
        'repo': 'https://github.com/khachimarur80/Koding',
      },
      {
        'show': false,
        'title': 'Kestoik',
        'text': 'Es una aplicación de tareas mejorada, similar al sistema de problemas de GitHub. También te permite escribir todas las cosas que haces, ver tu progreso, obtener una puntuación y escribir un diario basado en tus entradas en .md.',
        'images': [
          require('@/assets/images/Kestoik.png')
        ],
        'more': ['Ver Más', 'https://khachimarur80.github.io/Kestoik/'],
        'repo': 'https://github.com/khachimarur80/Kestoik',
      },
      {
        'show': false,
        'title': 'RedditYT',
        'text': 'Aplicación sencilla para crear videos de Reddit Youtube Shorts.',
        'images': [
          require('@/assets/images/redditYT.png')
        ],
        'more': ['Ver Más', 'https://khachimarur80.github.io/RedditYT/'],
        'repo': 'https://github.com/khachimarur80/RedditYT',
      },
      {
        'show': false,
        'title': 'WPapp',
        'text': 'Aplicación Electron.js que añade un fondo de pantalla animado.',
        'images': [
          require('@/assets/images/WPapp.png')
        ],
        'more': ['Ver Más', 'https://khachimarur80.github.io/WPapp/'],
        'repo': 'https://github.com/khachimarur80/WPapp',
      },
      {
        'show': false,
        'title': 'iTask',
        'text': 'Gestor de tareas en línea simple.',
        'images': [
          require('@/assets/images/iTask.png')
        ],
        'more': ['Ver en Vivo', 'https://khachimarur80.github.io/iTask/'],
        'repo': 'https://github.com/khachimarur80/iTask',
      },
    ],

  }),

  methods: {
    scrollToTarget(targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    handleScroll() {
      const mainElement = document.getElementById('main');
      this.showButton = mainElement.scrollTop > 100;

      const frames = this.$refs.frames;

      if (frames) {
        frames.forEach((frame, index) => {
          if (frame) {
            const rect = frame.$el.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            const isFrameInViewport = rect.top >= -rect.height/4 && rect.bottom <= windowHeight + rect.height/4

            let framesObjects =  this.projects
            framesObjects[index].show = isFrameInViewport
          }
        });
      }
    },
    scrollToTop() {
      const mainElement = document.getElementById('main');
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
  mounted() {
  },
  created() {

  }
}
</script>

<style>
  /*
  :root {
    --fade-time: 3s;
  }
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
  #main {
    height: 100vh;
    width: 100%;
    overflow: scroll;
    position: absolute;
    z-index: 3;
  }
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.7;
    z-index: 1000;
  }
  #blob {
    height: 34vmax;
    aspect-ratio: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    border-radius: 50%;
    background: linear-gradient(
      aquamarine,
      teal
    );
    animation: blobAnimation 10s infinite;
    opacity: 0.8;
  }
  #blur {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    backdrop-filter: blur(200px);
  }
  @keyframes blobAnimation {
    from {
      rotate: 0deg;
    }
    50% {
      scale: 1 1.5;
    }
    to {
      rotage: 360deg;
    }
  }
  @media screen and (max-width: 600px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
    #banner {
      height: 200px;
    }
    .scroll-to-top {
      bottom: 10px;
      right: 10px;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
    #banner {
      height: 300px;
    }
    .banner-contents {
      padding-top: 50px;
    }
  }

  @media screen and (min-width: 1025px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
    .frame {
      width: 80%;
      margin-left: 10%;
    }
    .text-h4 {
      margin-left: 10%;
    }
    #banner {
      height: 500px;
    }
    .banner-contents {
      padding-top: 140px;
    }
  }

  * {
    scroll-margin-top: 60px;
  }*/
</style>