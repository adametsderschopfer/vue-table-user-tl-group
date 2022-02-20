<template>
  <div class="dashboard__filters">
    <div class="dashboard__filters-title">
      <span>Фильтры</span>

      <button
          data-filter-type="CLEAR"
          @click="filterProcessHandler"
          class="dashboard__filters__title-action"

          v-if="activeFilterStatus"
      >Очистить
      </button>
    </div>

    <ul class="dashboard__filters-list">
      <li class="dashboard__filter">
        <div class="input-primary__wrapper">
          <span class="input-primary__text">
            Логин
          </span>

          <input
              type="text"
              @input="filterProcessHandler"
              data-filter-type="LOGIN"
              class="input-primary"
              title="Логин"
              v-model="login"
          >
        </div>
      </li>

      <li class="dashboard__filter">
        <div class="input-primary__group-row">
          <div class="input-primary__wrapper">
            <span class="input-primary__text">
              Подтвержденные заказы [От]
            </span>

            <input
                type="number"
                @input="filterProcessHandler"
                data-filter-type="CONFIRMED_ORDERS_START"
                v-model="confirmedOrdersStart"
                class="input-primary"
                title="Кол-во подтвержденных заказов: От"
            >
          </div>

          <div class="input-primary__wrapper">
            <span class="input-primary__text">
              Подтвержденные заказы [До]
            </span>

            <input
                type="number"
                @input="filterProcessHandler"
                data-filter-type="CONFIRMED_ORDERS_END"
                v-model="confirmedOrdersEnd"
                class="input-primary"
                title="Кол-во подтвержденных заказов: До"
            >
          </div>
        </div>
      </li>

      <li class="dashboard__filter">
        <label class="input-primary__wrapper">
          <span class="input-primary__text">
            Статус
          </span>

          <select
              class="dashboard__filter--status select-primary"
              title="Статус"
              @change="filterProcessHandler"
              data-filter-type="STATUS_ID"
          >
            <option :value="'all'">Выберете статус</option>

            <option
                :value="status.id"
                :selected="status.id.toString() === statusId.toString()"
                v-for="status in statusFiltersList">
              {{ status.name }}
            </option>
          </select>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import MockUsersData from "@/classes/MockUsersData";
import {mapGetters} from "vuex";
import {LocationQueryValue, useRoute} from 'vue-router';

@Options({
  data()
  {
    return {
      statusFiltersList: MockUsersData.statusList,
    }
  },

  computed: {
    ...mapGetters({
      activeFilterStatus: 'getActiveFilterStatus',
    }),

    login: {
      get(): string | LocationQueryValue[]
      {
        return useRoute().query.login || '';
      },
      set()
      {
      }
    },
    statusId: {
      get(): string | LocationQueryValue[]
      {
        return useRoute().query.statusId || '';
      },
      set()
      {
      }
    },
    confirmedOrdersStart: {
      get(): string | LocationQueryValue[]
      {
        return useRoute().query.confirmedOrdersStart || '';
      },
      set()
      {
      }
    },
    confirmedOrdersEnd: {
      get(): string | LocationQueryValue[]
      {
        return useRoute().query.confirmedOrdersEnd || '';
      },
      set()
      {
      }
    },
  },

  methods: {
    filterProcessHandler($event: any)
    {
      if (!('filterType' in $event.target.dataset)) {
        console.trace('[DashboardFilters]: Attribute data-filter-type is undefined');
        return;
      }

      this.$store.dispatch('setDashboardFilter', {
        filterType: $event.target.dataset.filterType,
        value: $event.target.value,
      });
    }
  }
})
export default class DashboardFilters extends Vue
{
}
</script>