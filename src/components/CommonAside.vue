<template>
  <el-aside width="200px">
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" >
     <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path">
       <i class="el-icon-menu"></i>
       <span slot="title">{{item.label}}</span>
     </el-menu-item>
      <el-submenu v-for="item in isChildren" :key="item.path">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.label}}</span>
        </template>
        <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">



           <el-menu-item  :index="subIndex" @click="clickMenu(subItem)">
                       <span  >{{subItem.label}}</span>
           </el-menu-item>

        </el-menu-item-group>


      </el-submenu>


    </el-menu>
  </el-aside>
</template>

<script type="text/javascript">
  export default{
    name:'CommonAside',
    data(){
      return{
            menu:[
                       {
                         path:'/',
                         name:'home',
                         label:'首页',
                         icon:'s-home',
                         url:'Home/Home'
                       },

                       {

                         label:'商品',
                         icon:'video-play',
                         children:[
                           {
                        path:'/list',
                        name:'list',
                        label:'商品列表',
                        icon:'video-play',
                        url:'MallManage/MallManage'
                           },
                           {
                        path:'/add',
                        name:'add',
                        label:'添加商品',
                        icon:'video-play',
                        url:'MallManage/MallManage'
                           },
                           {
                           path:'/category',
                           name:'category',
                           label:'商品分类',
                           icon:'video-play',
                           url:'MallManage/MallManage'
                              },
                         ]
                       }

                   ]
      }
    },
    computed:{
      noChildren(){
        return this.menu.filter(item=>!item.children)
      },
      isChildren(){
        return this.menu.filter(item=>item.children)
      }

    },
    methods:{
      clickMenu(item){
        this.$router.push({
          name:item.name
        })
      }
    }
  }
</script>
<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
