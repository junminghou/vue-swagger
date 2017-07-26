<<template>
  <div>
        <div>
            <el-button type="danger" @click="onClear">清空</el-button>
            <el-button type="primary" @click="showEntities">实体</el-button>
            <el-button type="primary" @click="showEdit">编辑</el-button>
            <el-button type="primary" @click="showDetail">详情</el-button>
            <el-checkbox label="实体注释" v-model="annotation" name="type"></el-checkbox>
        </div>
        <el-input type="textarea" :rows="10" placeholder="" v-model="filterPageKeys">
        </el-input>

        <div style="display:none;">
            <div ref="renderResults1" v-for="element in elements" v-bind:key="element.name">
            {{element.name}}:null, // {{element.description}}
            </div>
        </div>

        <div style="display:none;">
            <div ref="renderResults2" :title="element.description" v-for="element in elements" v-bind:key="element.name">
            &lt;div class="form-group" &gt; &lt;label class="control-label col-sm-2"&gt;{{element.description}}：&lt;/label&gt; &lt;div class="col-sm-4"&gt; &lt;input type="text" name="{{element.name}}" id="{{element.name}}" class="form-control" placeholder="请输入{{element.description}}" /&gt; &lt;/div&gt; &lt;/div&gt;
            </div>
        </div>

        <div style="display:none;">
            <div ref="renderResults3" :title="element.description" v-for="element in elements" v-bind:key="element.name">
            &lt;li&gt; &lt;span class="title"&gt;{{element.description}}：&lt;/span&gt; &lt;span class="content"&gt;{{element.nameformat}}&lt;/span&gt; &lt;/li&gt;
            </div>
        </div>

        <el-input type="textarea" :rows="10" placeholder="" v-model="renderResults">
        </el-input>
  </div>
</template>

<script>
export default {
    props: {
        elements: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            filterPageKeys: '',
            renderResults: ''
        }
    },
    methods: {
        showEntities() {
            this.renderResults = this.filterKey(this.$refs.renderResults1)
        },
        showEdit() {
            this.renderResults = this.filterKey(this.$refs.renderResults2)
        },
        showDetail() {
            this.renderResults = this.filterKey(this.$refs.renderResults3)
        },
        filterKey(divtemplate) {
            var keys = []
            var current = this
            if (current.filterPageKeys !== '' && current.filterPageKeys.length > 0) {
                keys = current.filterPageKeys.split('\n')
            }
            var str = ''

            if (keys.length > 0) {
                for (var j = 0; j < keys.length; j++) {
                    var key = keys[j]

                    str += this.getNewLineStr(divtemplate, (element) => {
                        if (element.title.indexOf(key) > -1 || key.indexOf(element.title) > -1) {
                            return true
                        }
                    })
                }
            } else {
                str += this.getNewLineStr(divtemplate, null)
            }

            return str
        },
        getNewLineStr(template, callback) {
            var lineStr = ''
            for (var i = 0; i < template.length; i++) {
                var element = template[i]

                if (callback === null || callback === undefined) {
                    lineStr += element.innerText
                    continue
                }
                if (callback(element)) {
                    lineStr += element.innerText
                }
            }
            return lineStr
        }
    }
}
</script>
