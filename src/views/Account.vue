<template>
  <transition appear>
    <div class="account">
      <AccountHeader @switchItem="switchItem"></AccountHeader>
      <AccountBottom :switchNum="switchNum"></AccountBottom>
    </div>
  </transition>
</template>

<script>
import AccountHeader from '../components/Account/AccountHeader'
import AccountBottom from '../components/Account/AccountBottom'
export default {
  name: 'Account',
  components: {
    AccountHeader,
    AccountBottom
  },
  methods: {
    switchItem (num) {
      this.switchNum = num
    }
  },
  data () {
    return {
      switchNum: 0
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../assets/css/mixin";
  @import "../assets/css/variable";
.account{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /*background-color: red;*/
  @include bg_sub_color();
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
