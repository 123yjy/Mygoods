<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="赠送积分">
      <el-input v-model="ruleForm.integral"></el-input>
    </el-form-item>

    <el-form-item label="积分购买限制">
      <el-input v-model="ruleForm.limit"></el-input>
    </el-form-item>

    <el-form-item label="预告商品">
      <el-switch v-model="ruleForm.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
    </el-form-item>


    <el-form-item label="服务保证">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="详细页面标题">
      <el-input v-model="ruleForm.title"></el-input>
    </el-form-item>
    <el-form-item label="商品关键字">
      <el-input v-model="ruleForm.key"></el-input>
    </el-form-item>
    <el-form-item label="商品备注">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="无优惠" name="first"></el-tab-pane>

        <el-tab-pane label="会员价格" name="third">
          <el-form-item label="黄金会员">
            <el-input v-model="ruleForm.huang" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="白金会员">
            <el-input v-model="ruleForm.bai" style="width:220px"></el-input>
          </el-form-item>
          <el-form-item label="钻石会员">
            <el-input v-model="ruleForm.zuan" style="width:220px"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="满减价格" name="fourth" border style="width: 380px;">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="满" width="100px">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.condtion" />
              </template>
            </el-table-column>
            <el-table-column type="index" label="立减" width="100px">
              <template slot-scope="scope">
                <el-input type="text" v-model="scope.row.reduce" />
              </template>
            </el-table-column>
            <el-table-column prop="index" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="()=>{setTableData(false , scope.row.id)}">删除</el-button>
                <el-button type="text" @click="()=>{setTableData(true)}">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="()=>{next(false)}">上一步,填写商品信息</el-button>
      <el-button type="primary" @click="()=>{next(true)}">下一步,填写商品促销</el-button>
    </el-form-item>
  </el-form>
</template>


<script>
export default {
  data() {
    return {
      activeName: "first",
      checkList: [],
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value: ""
      },
      tableData: [
        {
          id: Date.now(),
          condtion: 0,
          reduce: 0
        }
      ],

      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    next(bol) {
      this.$emit("next", bol);
    },
    setTableData(bol, id) {
      if (bol) {
        this.tableData.push({
          id: Date.now(),
          condtion: 0,
          reduce: 0
        });
      } else {
        let arr = this.tableData.filter(item => {
          return item.id === id ? false : true;
        });
        this.tableData = arr;
      }
    }
  }
};
</script>
<style type="text/css">
  .el-switch__core{
    margin-left: -23vw!important;
  }
  .el-checkbox-group{
    position: relative;
        left: -13vw!important;
  }
</style>
