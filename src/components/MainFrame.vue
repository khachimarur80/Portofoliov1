<template>
  <div 
    :class="[
      'frame', 
      isOdd ? 'odd' : 'even', 
      'pa-3', 
      oneImage  ? 'one-image' : '' ,
      data.show  ? 'show-frame' : '' 
    ]" 
    ref="frame">
    <div class="frame-inner-left">
      <v-card width="100%" height="100%" flat class="d-flex flex-column" color="transparent">
        <v-card-title>
          <div class="text-h5">
            {{ data.title }}
          </div>
        </v-card-title>
        <v-card-text>
          <div class="text-body-1">
            {{ data.text }}
          </div>
        </v-card-text>
        <v-card-actions class="align-self-end" v-if="data.more">
          <v-btn v-if="data.more[0]=='Download'" target="_blank" @click="download" icon  dense>
            <v-icon>
              mdi-download
            </v-icon>
          </v-btn>
          <v-btn variant="outlined" :href="data.more[1]" target="_blank" v-else>
            {{ data.more[0] }}
          </v-btn>
          <v-btn variant="outlined" :href="data.repo" v-if="data.repo" target="_blank">
            Repo
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="frame-inner-right">
      <v-row v-if="data.images.length == 9">
        <v-col
          v-for="(image, i) in data.images.slice(0, 9)"
          :key="i"
          cols="4"
        >
          <v-img :src="image" contain></v-img>
        </v-col>
      </v-row>
      <v-img :src="data.images[0]" contain width="100%" height="100%" v-else></v-img>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainFrame',

  props: {
    data : {
      required: true,
    },
    isOdd: {
      required: true,
    },
    oneImage: {
      required: true,
    },
  },

  methods : {
    download() {
      const userOS = navigator.platform;
      alert(userOS)
    }
  }
}
</script>

<style>
  .frame {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100h;
    opacity: 0;
    transition: opacity 0.5s, transform 0.5s;
    height: 300px;
  }
  .frame-inner-left, .frame-inner-right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100% !important;
  }

  .odd {
    flex-direction: row-reverse;
    transform: translateX(-100%);
  }
  .even {
    flex-direction: row;
    transform: translateX(100%);
  }
  .show-frame {
    transform: translateX(0);
    opacity: 1 !important;
  }

  @media screen and (max-width: 600px) {
    .frame {
      max-height: 600px;
    }
    .frame-inner-left, .frame-inner-right {
      width: 100%;
    }
    .one-image.odd {
      flex-direction: column;
    }
    .one-image.even {
      flex-direction: column;
    }
  }

  @media screen and (min-width: 601px) and (max-width: 1024px) {
    .frame {
      max-height: 300px;
    }
  }

  @media screen and (min-width: 1025px) {
    .frame {
      max-height: 350px;
    }
  }
</style>