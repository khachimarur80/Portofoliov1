<template>
  <v-app >
    <div id="blob">
    </div>
    <div id="blur"></div>

    <v-app-bar elevation="0" color="teal">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn @click="scrollToTarget('kei')">
        About Me
      </v-btn>
      <v-btn @click="scrollToTarget('projects')">
        Projects
      </v-btn>
      <v-btn @click="scrollToTarget('my-github')">
        My Github
      </v-btn>
      <v-btn @click="scrollToTarget('contact')">
        Contact
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn :href="pdfPath" download>
        Download CV
      </v-btn>
    </v-app-bar>
    <v-main @scroll="handleScroll" id="main">
      <div id="banner">
        <div class="banner-contents">
          <div v-for="(string, i) in charStrings" :key="i" class="string">
            <span class="fill-string">
              {{ string.slice(0, 6)  }}
            </span>
            <span class="main-string">
              {{ string[6] }}
            </span>
            <span class="fill-string">
              {{ string.slice(7, -1) }}
            </span>
          </div>
        </div>
      </div>
      <div class="text-h4 py-6 px-3" id="kei">
        About Me
      </div>
      <MainFrame v-for="(point, i) in aboutMe" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      <div class="text-h4 py-6 px-3" id="projects">
        Projects
      </div>
      <MainFrame v-for="(point, i) in myProjects" :key="i" :data="point" :isOdd="i%2==0" :oneImage="point.images.length==1" ref="frames" :data-title="point.title"/>
      <div class="text-h4 py-6 px-3" id="my-github">
        My GitHub
      </div>
      <div class="d-flex flex-column align-center">
        <div class="calendar">
        </div>
        <v-img src="https://github-readme-stats.vercel.app/api?username=khachimarur80&show_icons=true&theme=vue-dark" width="80%" max-width="500" class="py-3"></v-img>
        <v-img src="http://github-readme-streak-stats.herokuapp.com?user=khachimarur80&theme=vue-dark&date_format=M%20j%5B%2C%20Y%5D&card_width=468" width="80%" max-width="500" class="py-6"></v-img>
        <v-img src="https://github-readme-stats.vercel.app/api/top-langs/?username=khachimarur80&theme=vue-dark&card_width=468" width="80%" max-width="500" class="py-3"></v-img>
      </div>
      <div class="text-h4 py-6 px-3" id="contact">
        Contact
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
    sendText: 'Send',
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
    greeting: [
      'H', 'e', 'y', ' ','I', '\'' ,'m', ' ', 'K', 'e', 'i', 
      ],
    waitTime: 0,
    charStrings: [],
    aboutMe: [
      {
        'show' : false,
        'title' : 'What I am',
        'text' : 'I\'m a first year CS student who lives in Madrid. I enjoy playing the violin, various sports, and of course, coding. I love building and learning stuff!',
        'images' : [
          require('@/assets/images/Retiro.jpg')
        ],
      },
      {
        'show' : false,
        'title' : 'My Skills',
        'text' : 'My skills are revolved around Web Deb. I\'m fluent in JS, HTML, CSS and Python. I\'m familiar with Node.js, Django, Vue and Vuetify. I\'m currently learning Express.js and Vuex.',
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
    myProjects: [
      {
        'show' : false,
        'title' : 'My projects',
        'text' : 'Here are 3 of my big projects. Feel free to check them on github. I also have other fun projects, click "See More" if you want to see them :D',
        'images' : [
          require('@/assets/images/Logo.png')
        ],
        'more' : [
          'Other projects', '/projects'
        ],
      },
      {
        'show' : false,
        'title' : 'Luhmann',
        'text' : 'It is a platform where people can share their knowledge and work together. Data is stored in a tree-node, where bigger concepts include smaller ones. One cool feature is that uses WebSocket Technology to work simultaneously.',
        'images' : [
          require('@/assets/images/Luhmann.png')
        ],
        'more' : ['See Live', '#'],
        'repo' : 'https://github.com/khachimarur80/Luhmann',
      },
      {
        'show' : false,
        'title' : 'Diamond',
        'text' : 'Desktop application built with Electron.js. It is a simple, yet effective text editor. A text editor for your markdown, with WYSWYG. It is an "Obsidian" copy.',
        'images' : [
          require('@/assets/images/Diamond.png'),
        ],
        'more' : ['Download', '#'],
        'repo' : 'https://github.com/khachimarur80/MindMap',
      },
      {
        'show' : false,
        'title' : 'Koding',
        'text' : 'It is a platform where CS students share code, tutorials, notes and learn together. More experienced students can teach less experienced users, and earn points. It also includes an online code editor for the default courses!',
        'images' : [
          require('@/assets/images/Koding.png')
        ],
        'more' : ['See Live', '#'],
        'repo' : 'https://github.com/khachimarur80/Koding',
      },
      {
        'show' : false,
        'title' : 'Kestoik',
        'text' : 'It is a better to-do app, similar to GitHub\'s issues system. It also lets you write down all the things you do, see your progress, get a score and get written a journal based on your input in .md!',
        'images' : [
          require('@/assets/images/Kestoik.png')
        ],
        'more' : ['Download', '#'],
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
    moveBlob(event) {
      let blob = document.getElementById('blob')
      blob.animate({
        left: event.x + 'px',
        top: event.y + 'px'
      }, {duration: 3000, fill: 'forwards'})
    },
    submitForm() {
      this.sending = true
      const vm = this
      emailjs.init('Ifjg_oR_H0mMlRnTI')

      emailjs.sendForm("service_p4b392o", "template_wokpaeh", '#contact-form')
      .then(function () {
        document.getElementById('contact-form').reset();
        vm.sendColor = 'success'
        vm.sendText = 'Sended!'

        setTimeout(()=>{
          vm.sendColor = 'teal-lighten-2'
          vm.sendText = 'Send'
        }, 3000)

        vm.sending = false
      })
      .catch(function (error) {
        document.getElementById('contact-form').reset();
        vm.sendColor = 'error'
        vm.sendText = 'Error'

        setTimeout(()=>{
          vm.sendColor = 'teal-lighten-2'
          vm.sendText = 'Send'
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

            const isFrameInViewport = rect.top >= -rect.height/4 && rect.bottom <= windowHeight + rect.height/4

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
    pdfPath() {
      return require("@/assets/Kei_CV.pdf").default;
    },
  },
  mounted() {
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
    }, 70)
    document.documentElement.style.setProperty('--fade-time', .03*this.waitTime/.5+'s');
  },
  created() {
    document.addEventListener('mousemove', this.moveBlob)

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
    white-space: nowrap;
    user-select: none;
    animation: fadeMessage 1s ease-in-out forwards;
  }
  .string {
    writing-mode: vertical-rl;
    text-orientation: upright;
    height: fit-content;
    width: fit-content;
    padding: 0px;
    margin-left: -15px;
    margin-right: -15px;
    transform: translateY(-30px);
  }
  .scroll-to-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.7;
    z-index: 1000;
  }
  .fill-string {
    opacity: 1;
    animation: fadeLetters 1s ease-in-out forwards;
  }
  .main-string {
    font-size: 28px;
    animation-delay: 1s;
    animation: showLetters 1s ease-in-out forwards;
  }
  @keyframes fadeLetters {
    from {
      opacity: 1;
    }
    75% {
      opacity: .8;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes fadeMessage {
    from {
      transform: scale(8);
      gap: 0px;
    }
    to {
      transform: scale(1);
      gap: 10px;
    }
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
  #contact-form {
    display: flex;
    justify-content: center;
    align-items: center;
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
  }

  #send.v-btn[disabled] {
  opacity: 1;
}
</style>