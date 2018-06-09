<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <ul class="list">
          <li class="subtitle is-4" v-for="benefit in benefits" :key="benefit">{{ benefit }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'WelcomeBenefits',
  data() {
    return {
      benefits: [
        "Focus on what's important",
        'Increase mindfulness',
        'Lower stress',
        'Visualize changes over time',
        'Identify patterns',
      ]
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

li:not(:last-child) {
  &:after {
    content: '•';
    padding: 0 20px;
    color: #7957d5;
  }
}
</style>

