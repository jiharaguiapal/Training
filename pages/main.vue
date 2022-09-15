<template>
  <div class="">
    <Nav />
    <Sidetab />
    <!-- <div class="links">
       
        </a>
      </div> -->
  </div>
</template>

<script>
export default {
  middleware: "authenticate"
};
</script>

<style scoped>
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
