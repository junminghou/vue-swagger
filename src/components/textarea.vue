<template>
  <div>
<el-row>
  <el-col :span="12">
  <el-input  type="textarea" :rows="10" placeholder="" v-model="htmlData" width="50%">
    </el-input>
  </el-col>
    <el-col :span="12">
  <el-input  type="textarea" :rows="10" placeholder="" v-model="htmlData2" width="50%">
    </el-input>
  </el-col>

</el-row>


    <el-button type="primary" @click="onSubmit">实体</el-button>
  </div>
</template>


<script>
export default {
  data() {
    return {
      htmlData: '',
      htmlData2: ''
    }
  },
  methods: {
    onSubmit() {
      var arrayOne = this.htmlData.split('\n')
      var result = ''
      arrayOne.forEach(function (element) {
        if (element.indexOf(':') > -1) {
          result += element.replace(/:/, '\n')
        } else if (element.indexOf('：') > -1) {
          result += element.replace(/：/, '\n')
        }
      }, this)
      this.htmlData2 = result
      console.log(result)
    }
  }
}
</script>
