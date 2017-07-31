<template>
    <div>
        <div class="jsonview">
    
            <template v-if="jsondata.type === 'object'">
                <div v-for="array in jsondata.value" :key="array.key" :class="!jsondata.isroot ? 'margin':''">
                    <span> { </span>
                    <ul class="border">
                        <template v-for="entity in array">
                             <li v-if="entity.type === 0" :key="entity.key">
                                <span class="prop">
                                    <span class="q">"{{entity.key}}":</span>
                                </span>
                                <span class="num"> {{ entity.value }},</span>
                            </li>
                            <li v-else-if="entity.type === 1" :key="entity.key">
                                <span class="prop">
                                    <span class="q">"{{entity.key}}":</span>
                                </span>
                                <span class="num"> "{{ entity.value }}",</span>
                            </li>
                            <li v-else-if="entity.type === 2" :key="entity.key">
                                <span class="prop">
                                    <span class="q">"{{entity.key}}": </span>
                                </span>
                                <my-jsonview :jsondata='entity.children' style="margin-left: -2em;"></my-jsonview>
                            </li>
                            <li v-else-if="entity.type === 3" :key="entity.key">
                                <span class="prop">
                                    <span class="q">"{{entity.key}}": [</span>
                                </span>
    
                                <my-jsonview :jsondata='entity.children' class="border"></my-jsonview>
    
                                <span class="prop">
                                    <span>],</span>
                                </span>
                            </li>
                        </template>
                    </ul>
                    <span>}, </span>
                </div>
            </template>
    
            <template v-else-if="jsondata.type === 'array'">
                <span class="prop" v-if="jsondata.type === 'array' && jsondata.isroot">
                    <span class="q">[</span>
                </span>
    
                <div v-for="(array,index) in jsondata.value" :key="index" class="margin">
                    <span> { </span>
                    <ul class="border">
                        <template v-for="child in array">
                            <li v-if="child.type === 0" :key="child.key">
                                <span class="prop">
                                    <span class="q">"{{child.key}}":</span>
                                </span>
                                <span class="num"> {{ child.value }},</span>
                            </li>
                            <li v-else-if="child.type === 1" :key="child.key">
                                <span class="prop">
                                    <span class="q">"{{child.key}}":</span>
                                </span>
                                <span class="num"> "{{ child.value }}",</span>
                            </li>
                            <li v-else-if="child.type === 2" :key="child.key">
                                <span class="prop">
                                    <span class="q">"{{child.key}}": </span>
                                </span>
                                <my-jsonview :jsondata='child.children' style="margin-left: -2em;"></my-jsonview>
                            </li>
                            <li v-else-if="child.type === 3" :key="child.key">
                                <span class="prop">
                                    <span class="q">"{{child.key}}": [</span>
                                </span>
    
                                <my-jsonview :jsondata='child.children' class="border"></my-jsonview>
    
                                <span class="prop">
                                    <span>],</span>
                                </span>
                            </li>
                        </template>
                    </ul>
                    <span>}, </span>
                </div>
    
                <span class="prop" v-if="jsondata.type === 'array' && jsondata.isroot">
                    <span>]</span>
                </span>
            </template>
    
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-jsonview',
    props: {
        index: {
            type: Number
        },
        jsondata: {
            type: Object,
            default: {}
        },
        httpSource: {
            type: String,
            default: ''
        }
    },
    data() {
        return {

        }
    }
}
</script>

<style scoped>
@charset "UTF-8";

.jsonview {
    font-family: consolas !important;
}

.jsonview .border {
    border-left: 1px dotted #E1E1E8;
}

.jsonview .margin {
    margin-left: 2em;
}

.jsonview .prop {
    font-weight: bold;
    color: #91236c;
}

.jsonview .null {
    color: #431fff;
}

.jsonview .bool {
    color: #431fff;
}

.jsonview .num {
    /*color: #bf55ec; */
    color: #431fff;
}

.jsonview .string {
    font-size: 13px;
    color: #431fff;
    white-space: pre-wrap;
}

.jsonview a {
    font-size: 13px;
    color: #431fff;
    white-space: pre-wrap;
}

.jsonview .string.multiline {
    display: inline-block;
    vertical-align: text-top;
}

.jsonview .collapser {
    position: absolute;
    left: -1em;
    cursor: pointer;
}

.jsonview .collapsible {
    transition: height 1.2s;
    transition: width 1.2s;
}

.jsonview .collapsible.collapsed {
    height: .8em;
    width: 1em;
    display: inline-block;
    overflow: hidden;
    margin: 0;
}

.jsonview .collapsible.collapsed:before {
    content: "…";
    width: 1em;
    margin-left: .2em;
}

.jsonview .collapser.collapsed {
    transform: rotate(0deg);
}

.jsonview .q {
    display: inline-block;
    /*width: 0px;
    color: transparent;*/
}

.jsonview li {
    position: relative;
    margin-left: 2em;
}

.jsonview ul {
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
}

.jsonview h1 {
    font-size: 1.2em;
}
</style>
