<template>
  <div class="hello">
  
    <el-row :gutter="20">
      <el-col style="width: calc(100% - 350px);">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col style="width: 350px;">
        <el-button type="primary" @click="getJson()">Send</el-button>
        <el-button type="primary" @click="clearSession()">ClearSession</el-button>
        <el-button type="primary" @click="stretch()">Stretch</el-button>
      </el-col>
    </el-row>
    <h3></h3>
    <el-row>
      <el-col :span="5">
        <el-menu mode="vertical" theme="dark" default-active="1">
          <el-submenu :index="'parent' + parentIndex" v-for="(tag,parentIndex) in tags" :key="tag.name">
            <template slot="title">
              <i class="el-icon-star-on"></i> {{tag.name}}</template>
            <el-menu-item :index="'sub' + entity.index" v-for="entity in tag.paths" :key="tag.name + entity.type" @click="loadForm(entity)">
              <div>
                <span>{{ entity.type }}</span>
                <span> {{ entity.path }} </span>
              </div>
              <div>
                <span> </span>
                <span>{{ entity.summary }}</span>
              </div>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="middleSpan">
        <el-tabs v-model="activeName" @tab-click="handleClick" v-if="isShow">
          <el-tab-pane label="Parameters" name="first">
            <configManager :elements="elements" :entity="selectedEntity" :httpSource="httpSource" @sendRequestEvent="sendRequestEvent" :setheaders="setheadersArray"></configManager>
          </el-tab-pane>
          <el-tab-pane label="Header" name="second">
            <SetHeaders :elements="setheadersArray"></SetHeaders>
          </el-tab-pane>
          <el-tab-pane label="Test" name="san">
            <generate :elements="elements" :outputs="outputs"></generate>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="rightSpan">
        <el-tabs v-model="activeName2" v-if="isShow">
          <el-tab-pane label="Model" name="first">
            <Modelview :elements="responses_json"></Modelview>
          </el-tab-pane>
          <el-tab-pane label="Response" name="second">
            <Jsonview :jsondata="jsonviewData"></Jsonview>
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
import Modelview from '../components/modelview'
import Jsonview from '../components/jsonview'
import indexservice from '../business/indexservice'
import { _created, _clearSession } from '../business/helloinit'
import jsontoview from '../common/jsontoview'
import SetHeaders from '../components/setheaders'

export default {
  name: 'index',
  data() {
    return {
      input: 'http://orgapi.dev.apitops.com/organization-provider/v3/swagger',
      tags: [],
      resData: null,
      elements: [],
      outputs: [],
      isShow: false,
      activeName: 'first',
      activeName2: 'first',
      responses_json: null,
      index: 0,
      selectedEntity: null,
      httpSource: '',
      jsonviewData: null,
      middleSpan: 18,
      rightSpan: 1,
      setheadersArray: [
        { name: '', value: '' },
        { name: '', value: '' },
        { name: '', value: '' },
        { name: '', value: '' },
        { name: '', value: '' }
      ]
    }
  },
  created() {
    _created(this)
  },
  methods: {
    handleClick() {

    },
    clearSession() {
      _clearSession()
    },
    loadForm(entity) {
      this.selectedEntity = entity
      this.httpSource = this.input
      this.isShow = true
      this.elements = []
      var result = this.elements
      indexservice.loadRequestData(result, this.resData, entity.path)
      sessionStorage.setItem('rightForm', JSON.stringify(result))
      var responseData = indexservice.loadResponseData(this.resData, entity.path)
      this.responses_json = responseData.responses_json
      this.outputs = [responseData.responses_swagger]
      localStorage.setItem('model_view_entity', JSON.stringify(responseData.responses_json))
      console.table(this.outputs)
    },
    getJson() {
      const me = this
      me.tags = null
      _clearSession()
      sessionStorage.setItem('inputUrl', me.input)
      axios.get(me.input)
        .then(function (response) {
          me.resData = response.data
          var tags = indexservice.getRequestJson(me.resData)
          me.tags = tags
          sessionStorage.setItem('swaggerJson', JSON.stringify(me.resData))
          sessionStorage.setItem('leftList', JSON.stringify(tags))
        })
    },
    stretch() {
      if (this.rightSpan === 1) {
        this.rightSpan = 9
        this.middleSpan = 10
      } else {
        this.rightSpan = 1
        this.middleSpan = 18
      }
    },
    sendRequestEvent(data, time) {
      this.activeName2 = 'second'
      var result = Object.assign({}, { 'Api耗时': time + 'ms' }, data)
      this.jsonviewData = jsontoview(result)
    }
  },
  components: {
    Generate,
    ConfigManager,
    Modelview,
    Jsonview,
    SetHeaders
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body {
  font-family: 'Consolas', 'Microsoft YaHei', 'Open Sans', 'Droid Sans', Tahoma, Arial, sans-serif;
  font-size: 14px;
}

input {
  border-radius: 2px !important;
  height: 32px !important;
}

button {
  font-family: 'Consolas', 'Microsoft YaHei', 'Open Sans', 'Droid Sans', Tahoma, Arial, sans-serif;
  border-radius: 2px !important;
  height: 32px !important;
}

.el-button {
  line-height: 0px;
}

.hello .el-tabs__header {
  margin: 0px;
}

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
