<template>
  <div class="dashboard">
    <DashboardFilters/>

    <div class="dashboard__table-wrapper">
      <table class="dashboard__table">
        <thead class="dashboard__table--thead">
        <THeadRow :headFields="dashboardHeadFields"/>
        </thead>

        <tbody class="dashboard__table--tbody">
        <template v-if="userList.length">
          <TBodyRow v-for="user in userList" :userData="user"/>
        </template>
        <template v-else>
          <div class="dashboard__table--tbody-empty">
            Пользователи не найдены
          </div>
        </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapGetters, useStore} from "vuex";
import TBodyRow from "./components/TBodyRow.vue"
import THeadRow from "./components/THeadRow.vue";
import DashboardFilters from "@/components/Dashboard/components/DashboardFilters.vue";

@Options({
  components: {
    DashboardFilters,
    THeadRow,
    TBodyRow
  },

  computed: {
    ...mapGetters({
      userList: 'getUsers',
      dashboardHeadFields: 'getDashboardHeadFields',
    }),
  },

  beforeCreate()
  {
    const {dispatch} = useStore();
    dispatch('setDashboardFilter', {filterType: 'CHECK'});
  }
})
export default class Dashboard extends Vue
{
}
</script>

