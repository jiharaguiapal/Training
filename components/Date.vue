<template>
  <div>
    <date-range-picker v-model="range" />
  </div>
</template>

<script>
// import the package
import DateRangePicker from "@gravitano/vue-date-range-picker";

export default {
  components: {
    DateRangePicker
  },
  data: () => ({
    range: ["01/09/2018", "01/10/2018"]
  })
};
</script>
