<template>
  <div class="hello">
  
    <el-row :gutter="20">
      <el-col :span="16">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="getJson()">确定</el-button>
        <el-button type="primary" @click="clearSession()">清会话</el-button>
      </el-col>
    </el-row>
    <h3></h3>
    <el-row>
      <el-col :span="7">
  
        <el-menu mode="vertical" theme="dark" default-active="1">
          <el-submenu :index="parentIndex" v-for="(tag,parentIndex) in tags" :key="tag.name">
            <template slot="title">
              <i class="el-icon-star-on"></i> {{tag.name}}</template>
            <el-menu-item v-bind:index="entity.index" v-for="(entity,childIndex) in tag.paths" :key="tag.name + entity.type" @click="loadForm(entity)">
              <div>
                <span>{{ entity.type }}</span>
                <span> {{ entity.short_path }} </span>
              </div>
              <div>
                <span> </span>
                <span>{{ entity.summary }}</span>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
  
      <el-col :span="17">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="配置管理" name="first">
            <configManager :elements="elements"></configManager>
          </el-tab-pane>
          <el-tab-pane label="校验生成" name="second">
            <generate :elements="elements"></generate>
          </el-tab-pane>
        </el-tabs>
  
      </el-col>
    </el-row>
  
  </div>
</template>

<script>
import axios from 'axios'
import ConfigManager from '../components/configManager'
import Generate from '../components/generate'
import { _loadForm, _getJson } from '../business/helloservice'
import { _created, _clearSession } from '../business/helloinit'

export default {
  name: 'hello',

  data() {
    return {
      input: 'http://fangapi.dev.apitops.com/building-center-web/api/v1/swagger.json',
      tags: [],
      resData: null,
      elements: [],
      options: [
        { key: 'text', value: '文本框' },
        { key: 'select', value: '下拉框' },
        { key: 'radio', value: '单选框' },
        { key: 'checkbox', value: '复选框' },
        { key: 'datepicker', value: '日期框' },
        { key: 'textarea', value: '多文本' }
      ],
      annotation: false,
      isShowHtml: true,
      activeName: 'first'
    }
  },
  created() {
    _created(this)
  },
  methods: {
    clearSession() {
      _clearSession()
    },
    loadForm(entity) {
      this.elements = []
      var result = this.elements
      _loadForm(result, this.resData, entity.path)
      sessionStorage.setItem('rightForm', JSON.stringify(result))
    },
    getJson() {
      const me = this
      sessionStorage.setItem('inputUrl', me.input)

      axios.get(me.input)
        .then(function (response) {
          me.resData = response.data
          var tags = _getJson(me.resData)
          me.tags = tags
          sessionStorage.setItem('swaggerJson', JSON.stringify(me.resData))
          sessionStorage.setItem('leftList', JSON.stringify(tags))
        })
    }
  },
  components: {
    Generate,
    ConfigManager
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hello .el-menu-item-group__title {
  font-size: 16px;
}

.hello .el-menu-item {
  line-height: normal;
  height: 50px;
  padding-top: 1px;
  padding-left: 12px !important;
}

.hello .el-submenu__title {
  height: 48px;
  line-height: 48px;
}

.hello .el-menu-item div {
  margin-top: 2px;
  /*padding-left: 10px;*/
}

.hello .el-menu-item:first-child {
  margin-top: 3px;
}

.hello .el-menu-item div span:first-child {
  color: #1D8CE0;
  display: inline-block;
  width: 30px;
}

.hello .el-menu-item div:last-child {
  margin-top: 0px;
  color: #13CE66;
}


.hello .el-select .el-input {
  top: -2px;
}

.hello .el-select {
  height: 32px;
}
</style>
