<template>
  <div class="hero is-medium is-light" id="plans">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="box">
              <h4 class="title is-4 fancy has-text-centered">
                tinythoughts <span class="has-text-primary">premium</span>
              </h4>
              <div class="subtitle is-3 has-text-centered">
                $3/month
              </div>
              <ul class="fa-ul">
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Free for the first 14 days
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Daily image uploads
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Image gallery view
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Daily text entries
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Daily push notifications*
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Cancel any time
                </li>
              </ul>
            </div>
          </div>
          <div class="column">
            <div class="box">
              <h4 class="title is-4 fancy has-text-centered">
                tinythoughts <span class="has-text-grey">free</span>
              </h4>
              <div class="subtitle is-3 has-text-centered">
                free forever!
              </div>
              <ul class="fa-ul">
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Upload 5 images a month
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Daily text entries
                </li>
                <li>
                  <span class="fa-li">
                    <i class="fas fa-angle-double-right has-text-primary"></i>
                  </span>
                  Daily push notifications*
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="has-text-centered">
          <down-arrow
            anchor="signup"
            :classes="{ 'is-medium': true, 'is-outlined': false }"
            :is-primary="true"
            text="Get Started" />
        </div>
        <div class="disclaimer">
          <small>*Push notifications available in Chrome and Firefox only</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DownArrow from './DownArrow.vue'

export default {
  name: 'WelcomePlans',
  components: {
    DownArrow
  }
};
</script>

<style scoped lang="scss">
.box {
  height: 100%;
}

.container {
  max-width: 800px;
}

.disclaimer {
  margin-top: 40px;
}

li {
  line-height: 2.5rem;
}
</style>

