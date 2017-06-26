<template>
  <div class="hello">

    <el-row :gutter="20">
      <el-col :span="16">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" @click="getJson()">确定</el-button>
      </el-col>
    </el-row>
    <h3></h3>
    <el-row>
      <el-col :span="6">

        <el-menu mode="vertical" theme="dark" default-active="1">
          <el-menu-item-group v-for="(tag,parentIdx) in tags" :key="tag.name">
            <template slot="title">
              <i class="el-icon-star-off"></i> {{tag.name}}</template>
            <el-menu-item v-bind:index="{index:parentIdx + childIdx}" v-for="(entity,childIdx) in tag.paths" :key="tag.name + entity.type" @click="loadForm(entity)">
              <div>
                <span>{{ entity.type }}</span>
                <span> {{ entity.short_path }}</span>
              </div>
              <div>
                {{ entity.summary }}
              </div>
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>

      <el-col :span="18">
        <div class="border-style" v-if="elements.length > 0">
          <el-row :gutter="20" v-for="element in elements" :key="element.name">
            <el-col :span="6">
              {{element.name}}
            </el-col>
            <el-col :span="6">
              <el-select v-model="element.selected">
                <el-option v-for="option in options" :key="option.key" :value="option.key" :label="option.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              {{element.description}}
            </el-col>
            <el-col :span="6">
              {{element.required}}
            </el-col>
          </el-row>
          <el-button type="danger" @click="onClear">清空</el-button>
          <el-button type="primary" @click="onSubmit">实体</el-button>
          <el-button type="primary" @click="onSubmit2">新的1</el-button>
          <el-checkbox label="实体注释" v-model="annotation" name="type"></el-checkbox>
        </div>

        <div v-if="isShowHtml">
          <div id="renderResults1" v-for="element in elements" v-bind:key="element.name">
            {{element.name}}:null, // {{element.description}}
          </div>
        </div>

        <div v-if="isShowHtml">
          <div id="renderResults2" v-for="element in elements" v-bind:key="element.name">
            &lt;div class="form-group"&gt; &lt;label class="control-label col-sm-2"&gt;{{element.description}}：&lt;/label&gt; &lt;div class="col-sm-4"&gt; &lt;input type="text" name="{{element.name}}" id="{{element.name}}" class="form-control" placeholder="请输入{{element.description}}" /&gt; &lt;/div&gt; &lt;/div&gt;
          </div>
        </div>

        <el-input type="textarea" :rows="10" placeholder="" v-model="htmlData">
        </el-input>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import axios from 'axios'

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
      renderResults: '',
      isShowHtml: false,
      htmlData: ''
    }
  },
  created() {
    var inputUrl = sessionStorage.getItem('inputUrl')
    if (inputUrl !== null && inputUrl !== undefined && inputUrl !== '') {
      this.input = inputUrl
    }

    var leftList = sessionStorage.getItem('leftList')
    this.tags = JSON.parse(leftList)

    var rightForm = sessionStorage.getItem('rightForm')
    this.elements = JSON.parse(rightForm)

    var swaggerJson = sessionStorage.getItem('swaggerJson')
    this.resData = JSON.parse(swaggerJson)
  },
  methods: {
    loadForm(entity) {
      this.elements = []
      var result = this.elements
      var data = this.resData.paths[entity.path]
      var params = []
      if (data != null && data.hasOwnProperty('get')) {
        params = data.get.parameters
        for (var i = 0; i < params.length; i++) {
          var element = params[i]
          result.push({
            name: element.name,
            description: element.description,
            selected: 'text',
            required: element.required,
            type: element.type
          })
        }
      } else if (data != null && data.hasOwnProperty('post')) {
        var refClass = data.post.parameters[0].schema.$ref.split('/')[2]
        var obj = this.resData.definitions[refClass]
        var properties = obj.properties
        var requireds = obj.required || []
        for (var propertyKey in properties) {
          var propertyValue = properties[propertyKey]
          var type = propertyValue.type
          var selected = 'text'
          if (propertyValue.format === 'date-time') {
            type = 'datetime'
            selected = 'datepicker'
          }
          var required = (requireds.indexOf(propertyKey) > -1) ? propertyKey : '0'
          result.push({
            name: propertyKey,
            description: propertyValue.description,
            selected: selected,
            required: required,
            type: type
          })
        }
      }

      sessionStorage.setItem('rightForm', JSON.stringify(result))
    },
    onSubmit() {
      // this.htmlData = (document.getElementById('renderResults1').outerHTML())
      console.log(document.getElementById('renderResults1'))
    },
    onSubmit2() {
      this.htmlData = (document.getElementById('renderResults2').outerHTML())
    },
    getJson() {
      const me = this
      sessionStorage.setItem('inputUrl', me.input)

      axios.get(me.input)
        .then(function (response) {
          me.resData = response.data
          var data = response.data
          var tags = data.tags
          var paths = data.paths
          for (var i = 0; i < tags.length; i++) {
            var tag = tags[i]
            tag.paths = []
            for (var key in paths) {
              if (paths.hasOwnProperty(key)) {
                if (key.indexOf('/' + tag.name + '/') > -1) {
                  var path = paths[key]
                  var type = ''
                  var summary = ''
                  if (path.hasOwnProperty('get')) {
                    type = 'Get'
                    summary = path.get.summary
                  } else if (path.hasOwnProperty('post')) {
                    type = 'Post'
                    summary = path.post.summary
                  }

                  var tagPath = {
                    path: key,
                    short_path: key.split('/')[2],
                    type: type,
                    summary: summary
                  }
                  tag.paths.push(tagPath)
                }
              }
            }
          }
          me.tags = tags
          sessionStorage.setItem('swaggerJson', JSON.stringify(me.resData))
          sessionStorage.setItem('leftList', JSON.stringify(tags))
        })
    }
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
}

.hello .el-menu-item div:last-child {
  margin-top: 0px;
  color: #13CE66;
}

.hello .border-style {
  border: 1px solid #D3DCE6;
  border-radius: 3px;
  margin: 0px 10px 10px 10px;
  padding: 20px 10px 10px 10px;
  transition: .2s;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
}

.hello .border-style .el-row {}

.hello .border-style .el-row:last-of-type {
  margin-bottom: 10px;
}

.hello .border-style .el-row .el-col {
  border: 1px solid #D3DCE6;
  border-collapse: collapse;
  border-left: 0px;
  border-right: 0px;
  margin-top: -1px;
}

.hello .border-style .el-col {
  line-height: 37px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hello .border-style .el-input__inner {
  height: 32px;
}

.hello .el-select .el-input {
  top: -2px;
}

.hello .el-select {
  height: 32px;
}
</style>
