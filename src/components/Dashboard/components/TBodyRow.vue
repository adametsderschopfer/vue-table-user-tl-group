<template>
  <tr class="dashboard__table--tr dashboard__table--user">
    <td v-for="userFieldValue in Object.values(userData)" class="dashboard__table--td dashboard__table--user-field">
      <span class="dashboard__table--user-field__value" v-if="userFieldValue.hasOwnProperty('name')">
        {{ userFieldValue.name }}
      </span>

      <span class="dashboard__table--user-field__value" v-else>
        {{ userFieldValue }}
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {PropType} from "vue";
import UserEntity from "@/entity/UserEntity";

@Options({
  props: {
    userData: {
      type: Object as PropType<UserEntity>,
      required: true,
    }
  }
})
export default class TBodyRow extends Vue
{
}
</script>