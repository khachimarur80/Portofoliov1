<template>
  <div class="even frame pt-3 pl-3 pr-3">
    <div class="frame-inner-left">
      <v-card width="100%" height="100%" flat class="d-flex flex-column">
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
        <v-card-actions class="align-self-end">
          <v-btn variant="outlined">
            See more
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="frame-inner-right">
      <v-card  width="100%" height="100%" flat>
        <v-img v-for="(image, i) in data.images" :key="i" :src="image">
        </v-img>
      </v-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MainFrame',

  props: {
    data : {
      required: true,
    }
  },
}
</script>

<style>
  .frame {
    display: flex;
    gap: 12px;
    width: 100%;
  }
  .odd {
    flex-direction: row-reverse;
  }
  .even {
    flex-direction: row;
  }
  .frame-inner-left, .frame-inner-right {
    width: 50% !important;
    min-height: 200px;
  }
</style>