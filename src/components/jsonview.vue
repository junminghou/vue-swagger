<template>
    <div class="jsonview">
       <span> { </span>
        <ul class="obj level0">
            <li>
                <span class="prop"><span class="q">"Code":</span></span><span class="num"> 0,</span>
            </li>
            <li>
                <span class="collapser">-</span>
                <span class="prop"><span class="q">"Data": [</span></span>
                <ul class="array level1 collapsible">
                    <li>
                        <div class="collapser">-</div> 
                        <span class="prop"><span>{</span></span>
                        <ul class="obj level2 collapsible">
                            <li><span class="prop"><span class="q">"districtId": </span></span><span class="num"> 35,</span></li>
                            <li><span class="prop"><span class="q">"districtCode": </span></span><span class="num"> 110100,</span></li>
                        </ul>
                       <span class="prop"><span>}</span></span>
                    </li>
                </ul>
                <span class="prop"><span>],</span></span>
            </li>
        </ul>
        <span>} </span>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@charset "UTF-8";

.jsonview {
    margin-left: 20px;
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
