<template>
  <div class="sep">
    <el-steps :active="active" align-center style="margin-bottom:30px" finish-status="success">
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="填写商品属性"></el-step>
    </el-steps>
    <WriteShopInfo @next="next" v-if="active === 1" />
    <Promotion @next="next" v-else-if="active === 2" />
    <Property @next="next" v-else />
  </div>
</template>
<script>
import WriteShopInfo from "../../components/form/writeShopInfo.vue";
import Promotion from "../../components/form/promotion.vue";

import Property from "../../components/form/property.vue";
export default {
  name:'add',
  data() {
    return {
      active: 1
    };
  },
  methods: {
    next(bol) {
      bol ? this.active++ : this.active--;
      if (this.active > 3) this.active = 0;
    }
  },
  components: {
    WriteShopInfo,
    Promotion,
    Property
  }
};
</script>
<style  scoped>
.sep {
  width: 800px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 50px 30px;
}
._sep {
  margin-bottom: 40px;
}
</style>
