<template>
  <ul class="list">
    <li
      class="subtitle is-5 is-size-6-touch"
      v-for="benefit in benefits"
      :key="benefit">
      {{ benefit }}
    </li>
  </ul>
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

  @media only screen and (max-device-width : 768px) {
    align-items: center;
    flex-direction: column;
    flex-wrap: nowrap;
  }
}

@media only screen and (min-device-width : 768px) {
  li:not(:last-child) {
    &:after {
      content: '•';
      padding: 0 20px;
    }
  }
}

.subtitle {
  margin-bottom: 0;
}
</style>

