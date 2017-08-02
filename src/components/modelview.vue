<template>
    <div class="jsonview" v-if="elements !== null">
        <span> { </span>
        <ul class="obj level0" :key="element.key" v-for="element in elements">
            <template v-if="element.type==0">
                <li>
                    <span class="prop">
                        <span class="q">{{element.key}}:</span>
                    </span>
                    <span class="num"> {{element.description}}</span>
                </li>
            </template>
            <template v-else-if="element.type==1">
                <li>
                    <span class="prop">
                        <span class="q">{{element.key}}: </span>
                    </span>
                    <div class="group2">
                         <modelview :elements="element.data"></modelview>
                    </div>
                </li>
            </template>
            <template v-else-if="element.type==2">
                <li>
                    <span class="prop">
                        <span class="q">{{element.key}}: </span>
                    </span>
                    <div class="group2">
                        <span class="prop">
                            <span>[</span>
                        </span>
                    </div>
                    <div class="group">
                        <modelview :elements="element.data"></modelview>
                    </div>
                    <div class="group2">
                        <span class="prop">
                            <span>] </span>
                        </span>
                    </div>
                </li>
            </template>
        </ul>
        <span>} </span>
    </div>
</template>

<script>
export default {
    name: 'modelview',
    props: {
        elements: {
            type: Array,
            default: []
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
    margin-left: 0px;
    border-left: 1px solid #E1E1E8;
    font-family: consolas !important;
}

.jsonview .prop {
    font-weight: bold;
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
}

.jsonview .group {
    margin-left: 2em;
    position: relative;
}

.jsonview .group2 {
    margin-left: 0px;
    position: relative;
}

.jsonview ul {
    list-style: none;
    margin: 0 0 0 2em;
    padding: 0;
}

.jsonview h1 {
    font-size: 1.2em;
}

.jsonview .prop {
    color: #91236c;
}
</style>
