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
          <el-menu-item-group v-for="(tag,parentIdx) in tags">
            <template slot="title">
              <i class="el-icon-star-off"></i> {{tag.name}}</template>
            <el-menu-item v-bind:index="{index:parentIdx + childIdx}" v-for="(entity,childIdx) in tag.paths" @click="loadForm(entity)">
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
          <el-row :gutter="20" v-for="element in elements">
            <el-col :span="6">
              {{element.name}}
            </el-col>
            <el-col :span="6">
              <el-select v-model="element.selected">
                <el-option v-for="option in options" :value="option.key" :label="option.value"></el-option>
              </el-select>
            </el-col>
            <el-col :span="6">
              {{element.description}}
            </el-col>
            <el-col :span="6">
              {{element.required}}
            </el-col>
          </el-row>
          <el-button type="primary" @click="onSubmit">执行</el-button>
        </div>
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
      ]
    }
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
    },
    onSubmit() {
      const url = '/api/getLocalFile'
      return axios.get(url, {
        params: { filename: 'entityTemplate' }
      }).then((res) => {
        console.log(res.data)
        return Promise.resolve(res.data)
      })
    },
    getJson() {
      const me = this

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
