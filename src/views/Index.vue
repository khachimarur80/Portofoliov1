<template>
  <v-app >
    <v-app-bar elevation="0" color="teal">
      <v-spacer></v-spacer>

      <v-btn v-if="isSmallScreen" @click="scrollToTarget('kei')" height="32" width="32">
        <v-icon size="32">mdi-account</v-icon>
      </v-btn>
      <v-btn v-else @click="scrollToTarget('kei')">Sobre mí</v-btn>

      <v-btn v-if="isSmallScreen" @click="scrollToTarget('projects')" height="32" width="32">
        <v-icon size="32">mdi-briefcase</v-icon>
      </v-btn>
      <v-btn v-else @click="scrollToTarget('projects')">Proyectos</v-btn>

      <v-btn v-if="isSmallScreen" @click="scrollToTarget('my-github')" height="32" width="32">
        <v-icon size="32">mdi-github</v-icon>
      </v-btn>
      <v-btn v-else @click="scrollToTarget('my-github')">Mi Github</v-btn>

      <v-btn v-if="isSmallScreen" @click="scrollToTarget('contact')" height="32" width="32">
        <v-icon size="32">mdi-email</v-icon>
      </v-btn>
      <v-btn v-else @click="scrollToTarget('contact')">Contacto</v-btn>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main @scroll="handleScroll" id="main">
      <div id="banner">
        <div class="banner-contents">
          <div v-for="(string, i) in charStrings" :key="i" class="string">
            {{ string[6] }}
          </div>
        </div>
      </div>
      <div class="text-h4 py-6 px-3" id="kei">
        Sobre mí
      </div>
      <MainFrame v-for="(point, i) in aboutMe" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      <div class="text-h4 py-6 px-3" id="projects">
        Proyectos
      </div>
      <MainFrame v-for="(point, i) in myProjects" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      <div class="text-h4 py-6 px-3" id="my-github">
        Mi GitHub
      </div>
      <div class="d-flex flex-column align-center">
        <div class="calendar">
        </div>
        <v-img src="https://github-readme-stats.vercel.app/api?username=khachimarur80&show_icons=true&theme=vue-dark" width="80%" max-width="500" class="py-3"></v-img>
        <v-img src="http://github-readme-streak-stats.herokuapp.com?user=khachimarur80&theme=vue-dark&date_format=M%20j%5B%2C%20Y%5D&card_width=468" width="80%" max-width="500" class="py-6"></v-img>
        <v-img src="https://github-readme-stats.vercel.app/api/top-langs/?username=khachimarur80&theme=vue-dark&card_width=468" width="80%" max-width="500" class="py-3"></v-img>
      </div>
      <div class="text-h4 py-6 px-3" id="contact">
        Contacto
      </div>
      <v-form id="contact-form" @submit.prevent="submitForm" class="pb-10">
        <v-card width="100%" height="100%" max-width="600" flat class="d-flex flex-column pa-3">
          <input type="hidden" name="contact_number" v-model="formData.contact_number">
          <v-row>
            <v-col cols="12">
              <v-text-field
                solo
                v-model="formData.from_name"
                label="Name"
                required
                :rules="nameRules"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="formData.user_email"
                label="Email"
                required
                type="email"
                :rules="emailRules"
                variant="outlined"
                density="compact"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                regular
                v-model="formData.message"
                label="Message"
                required
                :rules="messageRules"
                no-resize
                auto-grow
                variant="outlined"
                density="compact"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex">
              <v-spacer></v-spacer>
              <v-btn type="submit" :color="sendColor" variant="outlined" :loading="sending" id="send" :disabled="sendText!='Send'">{{ sendText }}</v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-form>
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
import emailjs from 'emailjs-com';


export default {
  name: 'IndexView',

  components: {
    MainFrame,
  },

  data: () => ({
    sending: false,
    sendColor: 'teal-lighten-2',
    sendText: 'Enviar',
    socials: [
      {
        href: "mailto:khachimarur80@gmail.com",
        icon: require("@/assets/images/gmail.webp"),
        alt: "Gmail icon",
      },
      {
        href: "https://github.com/khachimarur80",
        icon: require("@/assets/images/github.webp"),
        alt: "GitHub icon",
      },
      {
        href: "https://linkedin.com/redirect-here",
        icon: require("@/assets/images/linkedin.webp"),
        alt: "LinkedIn icon",
      },
      {
        href: "https://instagram.com/krhachimaru",
        icon: require("@/assets/images/instagram.webp"),
        alt: "Instagram icon",
      },
    ],
    greeting: [
      'H', 'o', 'l', 'a', ' ', 's', 'o', 'y', ' ', 'K', 'e', 'i'
      ],
    waitTime: 0,
    charStrings: [],
    aboutMe: [
      {
        'show' : false,
        'title' : 'Quién Soy',
        'text' : 'Soy estudiante de primer año de Ingeniería Informática en Madrid. Disfruto tocando el violín, practicando diversos deportes y, por supuesto, programando. ¡Me encanta construir y aprender cosas nuevas!',
        'images' : [
          {
            image: require('@/assets/images/Retiro.webp'),
            lazy: require('@/assets/images/Retiro-lazy.webp'),
          }
        ],
      },
      {
        'show' : false,
        'title' : 'Mis Habilidades',
        'text' : 'Mis habilidades se centran en el desarrollo web. Hablo fluidamente JS, HTML, CSS y Python. Estoy familiarizado con Node.js, Django, Vue y Vuetify. Actualmente estoy aprendiendo Express.js y Vuex.',
        'images' : [
          {
            image : require('@/assets/images/html5-original.webp'),
            lazy: require('@/assets/images/html5-original-lazy.webp')
          },
          {
            image : require('@/assets/images/css3-original.webp'),
            lazy: require('@/assets/images/css3-original-lazy.webp')
          },
          {
            image : require('@/assets/images/python-original.webp'),
            lazy: require('@/assets/images/python-original-lazy.webp'),
          },
          {
            image : require('@/assets/images/django-plain.webp'),
            lazy: require('@/assets/images/django-plain-lazy.webp'),
          },
          {
            image : require('@/assets/images/javascript-plain.webp'),
            lazy: require('@/assets/images/javascript-plain-lazy.webp'),
          },
          {
            image : require('@/assets/images/vuejs-original.webp'),
            lazy: require('@/assets/images/vuejs-original-lazy.webp'),
          },
          {
            image : require('@/assets/images/vuetify-original.webp'),
            lazy: require('@/assets/images/vuetify-original-lazy.webp'),
          },
          {
            image : require('@/assets/images/nodejs-original.webp'),
            lazy: require('@/assets/images/nodejs-original-lazy.webp'),
          },
          {
            image : require('@/assets/images/electron-original.webp'),
            lazy: require('@/assets/images/electron-original-lazy.webp')
          }
        ],
      }
    ],
    myProjects: [
      {
        'show' : false,
        'title' : 'Mis Proyectos',
        'text' : 'Aquí tienes tres de mis proyectos más grandes. Siéntete libre de revisarlos en GitHub. También tengo otros proyectos divertidos, haz clic en "Ver Más" si quieres conocerlos :D',
        'images' : [
          {
            image: require('@/assets/images/Logo.webp'),
            lazy: require('@/assets/images/Logo-lazy.webp'),
          }
        ],
        'more' : [
          'Otros proyectos', '/projects'
        ],
      },
      {
        'show' : false,
        'title' : 'Luhmann',
        'text' : 'Es una plataforma donde las personas pueden compartir conocimientos y trabajar juntas. Los datos se almacenan en un árbol de nodos, donde los conceptos más grandes incluyen a los más pequeños. Una característica genial es que utiliza la tecnología WebSocket para trabajar simultáneamente.',
        'images' : [
          {
            image: require('@/assets/images/Luhmann.webp'),
            lazy: require('@/assets/images/Luhmann-lazy.webp'),
          }
        ],
        'more' : ['Ver Más', 'https://khachimarur80.github.io/Luhmann/'],
        'repo' : 'https://github.com/khachimarur80/Luhmann',
      },
      {
        'show' : false,
        'title' : 'Diamond',
        'text' : 'Aplicación de escritorio construida con Electron.js. Es un editor de texto simple pero efectivo. Un editor de texto para tu markdown, con vista previa en tiempo real. Es una copia de "Obsidian".',
        'images' : [
          {
            image: require('@/assets/images/Diamond.webp'),
            lazy: require('@/assets/images/Diamond-lazy.webp'),
          }
        ],
        'more' : ['Ver Más', 'https://khachimarur80.github.io/Diamond/'],
        'repo' : 'https://github.com/khachimarur80/MindMap',
      },
      {
        'show' : false,
        'title' : 'Koding',
        'text' : 'Es una plataforma donde los estudiantes de informática comparten código, tutoriales, notas y aprenden juntos. Los estudiantes más experimentados pueden enseñar a los usuarios menos experimentados y ganar puntos. ¡También incluye un editor de código en línea para los cursos predeterminados!',
        'images' : [
          {
            image: require('@/assets/images/Koding.webp'),
            lazy: require('@/assets/images/Koding-lazy.webp'),
          }
        ],
        'more' : ['Ver Más', 'https://khachimarur80.github.io/koding/'],
        'repo' : 'https://github.com/khachimarur80/Koding',
      },
      {
        'show' : false,
        'title' : 'Kestoik',
        'text' : 'Es una aplicación de tareas mejorada, similar al sistema de problemas de GitHub. También te permite escribir todas las cosas que haces, ver tu progreso, obtener una puntuación y escribir un diario basado en tus entradas en .md.',
        'images' : [
          {
            image: require('@/assets/images/Kestoik.webp'),
            lazy: require('@/assets/images/Kestoik-lazy.webp'),
          }
        ],
        'more' : ['Ver Más', 'https://khachimarur80.github.io/Kestoik/'],
        'repo' : 'https://github.com/khachimarur80/Kestoik',
      },
    ],
    formData: {
      contact_number: '',
      from_name: '',
      user_email: '',
      message: '',
    },
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 50) || 'Name must be less than 50 characters',
    ],
    emailRules: [
      v => !!v || 'Email is required',
      v => /.+@.+\..+/.test(v) || 'Email must be valid',
    ],
    messageRules: [
      v => !!v || 'Message is required',
      v => (v && v.length <= 500) || 'Message must be less than 500 characters',
    ],
    showButton: false,
  }),

  methods: {
    scrollToTarget(targetId) {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    },
    submitForm() {
      this.sending = true
      const vm = this
      emailjs.init('Ifjg_oR_H0mMlRnTI')

      emailjs.sendForm("service_p4b392o", "template_wokpaeh", '#contact-form')
      .then(function () {
        document.getElementById('contact-form').reset();
        vm.sendColor = 'success'
        vm.sendText = 'Enviado!'

        setTimeout(()=>{
          vm.sendColor = 'teal-lighten-2'
          vm.sendText = 'Enviar'
        }, 3000)

        vm.sending = false
      })
      .catch(function (error) {
        document.getElementById('contact-form').reset();
        vm.sendColor = 'error'
        vm.sendText = 'Error'

        setTimeout(()=>{
          vm.sendColor = 'teal-lighten-2'
          vm.sendText = 'Enviar'
        }, 3000)

        vm.sending = false
        console.error("Email sending failed:", error);
      });
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

            const isFrameInViewport = rect.top >= -rect.height/10 && rect.bottom <= windowHeight + rect.height/10

            let framesObjects = [...this.aboutMe, ...this.myProjects]
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
  computed: {
    isSmallScreen() {
      return window.innerWidth <= 600;
    },
  },
  mounted() {
    this.handleScroll()
    const interval = setInterval(()=>{
      let flag = true
      for (let i=0; i<this.charStrings.length; i++) {
        if (this.charStrings[i][6]!=this.greeting[i]) {
          this.charStrings[i] = this.charStrings[i].substring(1);  
          flag = false
        }
      }
      if (flag) {
        clearInterval(interval)
      }
    }, 60)
  },
  created() {
    let charStrings = []
    let indexes = []

    for (let j=0; j<this.greeting.length; j++) {
      let charString = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (let i = 0; i < 40; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);
        charString += randomChar;
      }

      const charToInsert = this.greeting[j];
      let randomIndex;

      if (charToInsert==' ') {
        randomIndex = Math.floor(Math.random() * (30 - 20 + 1) + 20) - 5;
      }
      else {
        randomIndex = Math.floor(Math.random() * (30 - 20 + 1) + 20);
      }

      charString = charString.slice(0, randomIndex) + charToInsert + charString.slice(randomIndex);

      indexes.push(randomIndex)
      charStrings.push(charString)
    }

    this.charStrings = charStrings

    this.waitTime = Math.max(...indexes) - 6
  }
}
</script>

<style>
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
  #banner {
    height: 230px;
    width: 100%;
    display: flex;
    color: aquamarine;
    overflow: hidden;
    background: rgba(0,0,0,.8);
    mix-blend-mode: multiply;
    box-shadow: 0px 0px 80px 80px rgba(0,0,0,.8);
    margin-bottom: 80px;
  }
  .banner-contents {
    flex: 1;
    display: flex;
    justify-content: center;
    overflow: hidden;
    align-items: center;
    user-select: none;
  }
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.7;
    z-index: 1000;
  }
  .string {
    text-align: center !important;
  }
  #blur {
    height: 100%;
    width: 100%;
    position: absolute;
    z-index: 2;
    backdrop-filter: blur(200px);
  }
  #contact-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media screen and (max-width: 600px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
    #banner {
      height: 200px;
    }
    .string {
      font-size: 30px;
      width: 20px !important;
    }
    .scroll-to-top {
      bottom: 10px;
      right: 10px;
    }
    .frame {
      height: fit-content;
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
    .string {
      font-size: 50px;
      width: 35px !important;
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
    .string {
      font-size: 80px;
      width: 60px !important;
    }
  }

  * {
    scroll-margin-top: 60px;
  }

  #send.v-btn[disabled] {
  opacity: 1;
}
</style>