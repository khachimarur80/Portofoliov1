<template>
  <v-app>
    <v-app-bar elevation="0" color="teal">

    </v-app-bar>
    <v-main class="pb-10 px-2" @scroll="handleScroll" id="main">
      <div class="text-h4 pa-3" id="kei">
        Kei Rodríguez Hachimaru
      </div>
      <MainFrame v-for="(point, i) in aboutMe" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      <div class="text-h4 pa-3" id="projects">
        Projects
      </div>
      <div class="text-h4 pa-3" id="my-github">
        My GitHub
      </div>
      <div class="d-flex flex-column align-center">
        <div class="calendar">
        </div>
        <v-img src="https://github-readme-stats.vercel.app/api?username=khachimarur80&show_icons=true&theme=vue-dark" width="80%" max-width="500" class="py-3"></v-img>
        <v-img src="http://github-readme-streak-stats.herokuapp.com?user=khachimarur80&theme=vue-dark&date_format=M%20j%5B%2C%20Y%5D&card_width=468" width="80%" max-width="500" class="py-3"></v-img>
        <v-img src="https://github-readme-stats.vercel.app/api/top-langs/?username=khachimarur80&theme=vue-dark&card_width=468" width="80%" max-width="500" class="py-3"></v-img>
      </div>
      <div class="text-h4 pa-3" id="contact">
        Contact
      </div>
      <v-form id="contact-form" @submit.prevent="submitForm">
        <v-card width="100%" height="100%" flat class="d-flex flex-column pa-3">
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
            <v-col cols="10">
            </v-col>
            <v-col cols="2">
              <v-btn type="submit" color="teal-lighten-2" variant="outlined">Send</v-btn>
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
    aboutMe: [
      {
        'show' : false,
        'title' : 'About Me',
        'text' : 'I\'m a first year CS student who lives in Madrid. I enjoy playing the violin, various sports, and of course, coding. I love building and learning stuff!',
        'images' : [
          require('@/assets/images/Retiro.jpg')
        ],
      },
      {
        'show' : false,
        'title' : 'My Skills',
        'text' : 'Hey, I\'m Kei.',
        'images' : [
          require('@/assets/images/html5-original.svg'),
          require('@/assets/images/css3-original.svg'),
          require('@/assets/images/python-original.svg'),
          require('@/assets/images/django-plain.svg'),
          require('@/assets/images/javascript-plain.svg'),
          require('@/assets/images/vuejs-original.svg'),
          require('@/assets/images/vuetify-original.svg'),
          require('@/assets/images/nodejs-original.svg'),
          require('@/assets/images/electron-original.svg'),
        ],
      }
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
    submitForm() {
      // You can handle form submission logic here
      // Access form data via this.formData
      console.log(this.formData);
      // You can use Vue resource or Axios to send data to the server
      // Example using Axios:
      // axios.post('/your-api-endpoint', this.formData)
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });
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

            this.aboutMe[index].show = isFrameInViewport
          }
        });
      }
    },
    scrollToTop() {
      const mainElement = document.getElementById('main');
      mainElement.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
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
  #main {
    height: 100vh;
    width: 100%;
    overflow: scroll;
  }
  .scroll-to-top {
    position: absolute;
    bottom: 20px;
    right: 20px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.7;
    z-index: 1000;
  }
  @media screen and (max-width: 600px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
  }

  @media screen and (min-width: 1025px) {
    #contact-form {
      width: 80%;
      margin-left: 10%;
    }
  }
</style>