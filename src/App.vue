<template>
  <div>
    <router-view v-if="showRouterView" />
    <b-loading :is-full-page="true" :active="true" v-else></b-loading>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'encryptionKey',
      'isAuthenticated',
      'userIsLoading'
    ]),
    showRouterView() {
      return ((!!this.encryptionKey === this.isAuthenticated) && !this.userIsLoading)
    }
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Special+Elite|Raleway');
.logo {
  font-family: 'Special Elite', cursive;
  font-size: 1.5rem;
}

.fancy {
  font-family: 'Special Elite', cursive;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body, button, input, select, textarea {
  color: #2c3e50;
  font-family: 'Raleway', sans-serif;
}

.hero.is-primary .card .tabs li.is-active a,
.hero.is-primary .card .tabs li.is-active a:hover {
  background-color: #7957d5;
  border-color: #7957d5;
  color: white;
}

.hero.is-primary .card .tabs a {
  color: #4a4a4a;
}

.hero-body {
  overflow: hidden;
}

.message a:not(.button):not(.tag) {
  text-decoration: none;
}

.upload-draggable {
  width: 100%;
}

.lightbox {
  .modal-content {
    height: 100%;
    overflow: hidden;
  }
}

.button.is-text {
  text-decoration: none;
}

.lightbox  {
  img {
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    width: 100%;
  }
}

.StripeElement {
  color: #363636;
  display: block;
  margin: 10px 0 20px 0;
  font-size: 1em;
  box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.1);
  border: 1px solid transparent;
  border-radius: 4px;
  outline: 0;
  border-color: #dbdbdb;
  background: #fff;
  line-height: 1.5;
  padding-bottom: calc(0.375em - 1px);
  padding-left: calc(0.625em - 1px);
  padding-right: calc(0.625em - 1px);
  padding-top: calc(0.375em - 1px);
}

.StripeElement--focus {
  border-color: #7957d5;
  box-shadow: 0 0 0 0.125em rgba(121, 87, 213, 0.25);
}

.coupon-input {
  input {
    text-transform: uppercase;
  }
}
</style>
