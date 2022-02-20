<template>
  <tr class="dashboard__table--tr">
    <td
        v-for="field in headFields"
        class="dashboard__table--td"
    >
      <div class="dashboard__table--thead__item">
        <span class="dashboard__table--thead__title">
          {{ field.title }}
        </span>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import {THeadField} from "@/store/types";

@Options({
  props: {
    headFields: {
      required: true,
      type: Array,
    }
  }
})
export default class THeadRow extends Vue {
}
</script>