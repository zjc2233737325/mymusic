<template>
  <transition appear>
    <div class="account">

    </div>
  </transition>
</template>

<script>
export default {
  name: 'Account'
}
</script>

<style scoped lang="scss">
.account{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: red;
}

.v-enter{
  transform: translateX(100%);
  /*opacity: 0;*/
}
.v-enter-to{
  transform: translateX(0%);
  /*opacity: 1;*/
}
.v-enter-active{
  transition: all 0.5s;
}
.v-leave{
  /*opacity: 1;*/
  transform: translateX(0%);
}
.v-leave-to{
  /*opacity: 0;*/
  transform: translateX(100%);
}
.v-leave-active{
  transition: all 0.5s;
}
</style>
