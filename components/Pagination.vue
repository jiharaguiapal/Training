<template>
  <div class="overflow-auto">
    <div class="mt-3">
      <b-pagination-nav
        :link-gen="linkGen"
        :number-of-pages="10"
        use-router
        align="center"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?" : `?page=${pageNum}`;
    }
  }
};
</script>
