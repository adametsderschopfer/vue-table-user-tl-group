<template>
  <div class="homepage">
    <div class="homepage__logo">
      <img alt="Vue logo" src="../assets/logo.png">
    </div>

    <div class="homepage__title">
      Тестовое задание
    </div>

    <Dashboard/>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Dashboard from '@/components/Dashboard/Dashboard.vue';

@Options({
  components: {Dashboard},
})
export default class HomeView extends Vue
{
}
</script>
