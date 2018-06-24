<template>
  <footer class="footer">
    <div class="container has-text-centered">
      <div>
        <p>
          <strong class="fancy">tinythoughts</strong> by <a href="http://jessis.cool" target="_blank">Jess</a>
        </p>
        <div>
          <a href="https://www.facebook.com/tinythoughtsapp/" target="_blank">
            <b-icon icon="facebook-square" pack="fab" size="is-large"></b-icon>
          </a>
          <a href="https://twitter.com/tinythoughts4" target="_blank">
            <b-icon icon="twitter-square" pack="fab" size="is-large"></b-icon>
          </a>
          <a href="mailto:tinythoughtsapp@gmail.com" target="_blank">
            <b-icon icon="envelope-square" size="is-large"></b-icon>
          </a>
        </div>
        <div class="privacy-links">
          <small>
            <router-link to="/terms-and-conditions">Terms & Conditions</router-link>
          </small> |
          <small>
            <router-link to="/privacy-policy">Privacy Policy</router-link>
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>

export default {
  name: 'TinyFooter',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
p {
  margin-bottom: 20px;
}

.privacy-links {
  margin-top: 40px;
}
</style>
