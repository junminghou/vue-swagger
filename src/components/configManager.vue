<<template>
    <div class="border-style" v-if="elements.length > 0">
        <el-row :gutter="24">
            <el-col :span="21">
                    {{path}}
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="getJson()">Send</el-button>
            </el-col>
        </el-row>
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
               <el-input :placeholder="'请输入：' + element.description"></el-input>
            </el-col>
            <el-col :span="6">
                {{ element.type }}
            </el-col>
        </el-row>
    </div>
</template>

<script>
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
        path: {
            type: String,
            default: ''
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
            input: ''
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
