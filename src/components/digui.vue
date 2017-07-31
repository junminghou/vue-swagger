<template>
    <div>
        <div> {{model.data.menuName}}</div>
        <div style="padding-left:20px;"> 
            <items v-for="cel in model.childTreeNode" :model='cel' :key="cel.id"></items>
        </div>
    </div>
</template>
<script>
export default {
    name: 'items',
    props: ['model'],
    data() {
        return {
        }
    }
}
</script>
