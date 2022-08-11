<template>
  <el-row class="home" :gutter="20">
    <!-- span	栅格占据的列数 -->
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top:20px;height:460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tabelLabel" :key="key" :prop="key" :label="val">

          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="num" style="display:flex;flex-wrap:wrap">
        <el-card v-for="item in countData" :key="item.name"
          :body-style="{display:'flex',padding:0,width:'14vw',margin:'10px'}">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px;margin-top:10px">
        <div style="height:280px;" ref="echarts"></div>
      </el-card>
      <div class="graph" style="display:flex;margin-top:10px">
        <el-card class="two">
          <div style="height:240px" ref="userEcharts"></div>
        </el-card>
        <el-card class="two">
          <div style="height:240px" ref="videoEcharts"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import {getData} from '../../api/data.js'
  import * as echarts from 'echarts'
  export default {
    name: 'home',
    data() {
      return {
        // userImg: require('../../src/assets/logo.png')
        userImg: require("../../assets/logo.png"),
        tableData: [],
        tabelLabel: {
          name: '课程',
          todayBuy: '今日购买',
          monthBuy: '本月购买',
          totalBuy: '总购买'
        },
        countData: [{
            name: '今日支付订单',
            value: 1234,
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '今日收藏订单',
            value: 1234,
            icon: 'star-on',
            color: '#2ec7c9'
          },
          {
            name: '今日未支付订单',
            value: 1234,
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '本月支付订单',
            value: 1234,
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '本月收藏订单',
            value: 1234,
            icon: 'success',
            color: '#2ec7c9'
          },
          {
            name: '本月未支付订单',
            value: 1234,
            icon: 'success',
            color: '#2ec7c9'
          },

        ]
      }
    },
    mounted() {

        this.$http.get('/user?ID=12345')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error){
          console.log(error);
        })
      getData().then(res => {
        const {
          code,
          data
        } = res.data
        if (code === 20000) {
          this.tableData = data.tableData
          const order = data.orderData
          const xData = order.date
          const keyArray = Object.keys(order.data[0])
          const series = []
          keyArray.forEach(key => {
            series.push({
              name: key,
              data: order.data.map(item => item[key]),
              type: 'line'
            })

          })

          const option = {
            xAxis: {
              data: xData
            },
            yAxis: {},
            legend: {
              data: keyArray
            },
            series

          }
          const E = echarts.init(this.$refs.echarts)
          E.setOption(option)

          //    用户图
          const userOption = {
            legend: {
              textStyle: {
                color: "#333",
              },

            },
            grid: {
              left: "20%",

            },
            tooltip: {
              trigger: "axis",
            },
            xAxis: {
              type: "category",
              data: data.userData.map(item => item.date),
              axisLine: {
                lineStyle: {
                  coloe: "#17b3a3",
                },
              },
              axisLabel: {
                interval: 0,
                color: "#333",

              },
            },
            yAxis: [{
              type: "value",
              axisLine: {
                lineStyle: {
                  color: "#17b3a3",
                },
              },
            }, ],
            color: ["#2ec7c9", "#b6a2de"],
            series: [{
                name: '新增用户',
                data: data.userData.map(item => item.new),
                type: 'bar'
              },
              {
                name: '活跃用户',
                data: data.userData.map(item => item.active),
                type: 'bar'
              }
            ],
          }

          const U = echarts.init(this.$refs.userEcharts)
          U.setOption(userOption)

          // 饼图
          const videoOption = {
            tooltip: {
              trigger: "item",

            },
            color: [
              "#of78f4",
              "#dd536b",
              "#9462e5",
              "#a6a6a6",
              "#e1bb22",
              "#39c362",
              "#3ed1cf",
            ],
            series: [{
              data: data.videoData,
              type: 'pie'
            }],

          }
          const V = echarts.init(this.$refs.videoEcharts)
          V.setOption(videoOption)
        }
        console.log(res)
      })
    }
  }
</script>
<style lang="less" scoped>
  .two {
    height: 260px;
    width: 50%;
    margin: 0 10px
  }

  .login-info {
    color: rgb(137, 124, 124);
  }

  .user {
    border-bottom: 1px solid #ccc;
    display: flex;

    img {
      border-radius: 50%;
    }

    .userinfo {
      margin: auto;

      .name {
        font-size: 2vw;
      }

      .access {
        color: rgb(132, 129, 129);
      }
    }
  }

  .el-main {
    line-height: 1;
  }
  .icon{
    width: 10vh!important;
  }
</style>
