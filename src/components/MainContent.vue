<template>

    <router-view></router-view>
 
  

</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.$router.push({
      path: "/index"
    });
  },
  methods: {
    goto: (a) => {
      this.$router.push({
        path: a
      });
    }
  }
};
</script>

<style>
#left-nav {
  height: 100%;
}

.el-main {
  padding: 0px;
}
</style>