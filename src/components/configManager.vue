<template>
    <div class="border-style">
        <el-row :gutter="24">
            <el-col :span="21">
                {{entity.path}}
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="sendRequest()">Send</el-button>
            </el-col>
        </el-row>
    
        <div v-if="isShow">
            <el-row :gutter="20" v-for="element in elements" :key="element.name">
                <el-col :span="5" v-if="element.required === '0'">
                    {{element.name}}
                </el-col>
                <el-col :span="5" v-if="element.required !== '0'">
                    <span style="color:red;">*{{element.name}}</span>
                </el-col>
                <el-col :span="13">
                    <!--<el-select v-model="element.selected">
                                                                                                                                                                                                                                        <el-option v-for="option in options" :key="option.key" :value="option.key" :label="option.value"></el-option>
                                                                                                                                                                                                                                        </el-select>-->
                    <el-input :placeholder="'请输入：' + element.description" v-model="element.value">
                        <template slot="append"> {{ element.in }}</template>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    {{ element.type }}
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import junming from '../common/jmlib'

export default {
    name: 'configManager',
    props: {
        elements: {
            type: Array,
            default: []
        },
        index: {
            type: Number
        },
        entity: {
            type: Object,
            default: null
        },
        httpSource: {
            type: String,
            default: ''
        },
        setheaders: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            options: [
                { key: 'text', value: '文本框' },
                { key: 'select', value: '下拉框' },
                { key: 'radio', value: '单选框' },
                { key: 'checkbox', value: '复选框' },
                { key: 'datepicker', value: '日期框' },
                { key: 'textarea', value: '多文本' }
            ],
            input: '',
            testvalue: '1111111111111'
        }
    },
    computed: {
        isShow() {
            return this.elements.length > 0
        }
    },
    methods: {
        sendRequest() {
            var url = null
            var me = this
            var shortpath = this.entity.path
            if (this.httpSource.indexOf('/swagger.json') > -1) {
                url = this.httpSource.replace(/\/swagger.json/, shortpath)
            } else if (this.httpSource.indexOf('/swagger') > -1) {
                url = this.httpSource.replace(/\/swagger/, shortpath)
            }

            var query = {}
            var body = {}
            var hasQuery = false
            var hasBody = false
            var hasPath = false
            for (var i = 0; i < this.elements.length; i++) {
                var element = this.elements[i]
                if (junming.IsNullOrEmpty(element.value)) {
                    continue
                }
                var value = element.value
                if (element.type === 'integer') {
                    value = parseInt(value)
                }
                if (element.in === 'path') {
                    var regExp = new RegExp('{' + element.name + '}', 'gi')
                    url = url.replace(regExp, element.value)
                    hasPath = true
                } else if (element.in === 'query') {
                    query[element.name] = value
                    hasQuery = true
                } else if (element.in === 'body') {
                    body[element.name] = value
                    hasBody = true
                }
            }

            if (hasQuery) {
                url = url + '?' + junming.EntityToUrl(query, true)
            }

            if (url.indexOf('/organization-provider/') > -1) {
                var hasValue = false
                for (var k = 0; k < this.setheaders.length; k++) {
                    var objnew = this.setheaders[k]
                    if (!junming.IsNullOrEmpty(objnew.value) && !junming.IsNullOrEmpty(objnew.name)) {
                        if (objnew.name === 'App-Key') {
                            hasValue = true
                            break
                        }
                    }
                }
                if (!hasValue) {
                    this.setheaders.push({ name: 'App-Key', value: '553dc55d0dd04e8fbb73cde303a1e02c' })
                }
            }

            var headers = {}
            if (!junming.IsNull(this.setheaders) && this.setheaders.length > 0) {
                for (var j = 0; j < this.setheaders.length; j++) {
                    var obj = this.setheaders[j]
                    if (!junming.IsNullOrEmpty(obj.value)) {
                        headers[obj.name] = obj.value
                    }
                }
            }

            var data = {
                method: '',
                url: url,
                headers: headers,
                body: ''
            }
            var beginTime = new Date()
            if (me.entity.type === 'Get') {
                data.method = 'get'
                axios.post('/api/requestapi', data).then(function (response) {
                    me.$emit('sendRequestEvent', response.data, computertime(beginTime))
                })
            } else if (me.entity.type === 'Post') {
                axios.post(url, body)
                    .then(function (response) {
                        me.$emit('sendRequestEvent', response.data, computertime(beginTime))
                    })
            } else if (me.entity.type === 'Del') {
                axios.delete(url)
                    .then(function (response) {
                        me.$emit('sendRequestEvent', response.data, computertime(beginTime))
                    })
            } else if (me.entity.type === 'Put') {
                axios.put(url, body)
                    .then(function (response) {
                        me.$emit('sendRequestEvent', response.data, computertime(beginTime))
                    })
            }

            function computertime(beginTime) {
                var endTime = new Date()
                return endTime.getTime() - beginTime.getTime()
            }
            console.log(me.entity.type)
        }
    }
}
</script>

<style>
.border-style {
    border: 0px solid #D3DCE6;
    border-radius: 3px;
    margin: 0px 0px 0px 0px;
    padding: 0px 10px 0px 10px;
    transition: .2s;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
}

.border-style .header {
    padding-bottom: 10px;
    padding-top: 10px;
}

.border-style .el-row:last-of-type {
    margin-bottom: 10px;
}

.border-style .el-row .el-col {
    border: 1px solid #D3DCE6;
    border-collapse: collapse;
    border-left: 0px;
    border-right: 0px;
    margin-top: -1px;
}

.border-style .el-col {
    line-height: 37px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>
