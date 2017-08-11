<template>
    <div>
        <el-row :gutter="20" v-for="element in elements" :key="element.key">
    
            <el-col :span="8">
                <el-input placeholder="Key" v-model="element.name">
                </el-input>
            </el-col>
            <el-col :span="13">
                <el-input placeholder="Value" v-model="element.value">
                </el-input>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    name: 'setheaders',
    props: {
        elements: {
            type: Array,
            default: []
        }
    }
}
</script>
