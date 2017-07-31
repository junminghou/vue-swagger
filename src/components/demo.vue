<template>
    <div>
        <!--<Digui :model='model' v-for='model in data' :key='model.id'></Digui>-->
        <jsonview :jsondata="jsondata"></jsonview>
    </div>
</template>
<script>
import Digui from '../components/digui'
import jsonview from '../components/jsonview'
export default {
    data() {
        return {
            data: [{
                'id': '1',
                'data': {
                    'menuName': '项目管理',
                    'menuCode': ''
                },
                'childTreeNode': [{
                    'data': {
                        'menuName': '项目',
                        'menuCode': 'BusProject'
                    },
                    'childTreeNode': []
                }, {
                    'data': {
                        'menuName': '我的任务',
                        'menuCode': 'BusProject'
                    },
                    'childTreeNode': []
                }, {
                    'data': {
                        'menuName': '人员周报',
                        'menuCode': 'BusProject'
                    },
                    'childTreeNode': []
                }]
            }, {
                'id': '2',
                'data': {
                    'menuName': '数据统计',
                    'menuCode': 'BusClock'
                },
                'childTreeNode': []
            }, {
                'id': '3',
                'data': {
                    'menuName': '人事管理',
                    'menuCode': ''
                },
                'childTreeNode': []
            }, {
                'id': '4',
                'data': {
                    'menuName': '基础管理',
                    'menuCode': ''
                },
                'childTreeNode': []
            }],
            jsondata: {
                type: 'array',
                isroot: true,
                value:
                [
                    [
                        {
                            key: 'Code',
                            type: 1,
                            value: '0'
                        },
                        {
                            key: 'Data',
                            type: 2,
                            value: '18',
                            children: {
                                type: 'object',
                                value: [
                                    [
                                        {
                                            key: 'name',
                                            type: 1,
                                            value: '张三'
                                        },
                                        {
                                            key: 'age',
                                            type: 1,
                                            value: '18'
                                        },
                                        {
                                            key: 'sex',
                                            type: 1,
                                            value: '男'
                                        }
                                    ]
                                ]
                            }
                        },
                        {
                            key: 'Message',
                            type: 1,
                            value: '没有错误信息'
                        }
                    ],
                    [
                        {
                            key: 'Q1',
                            type: 1,
                            value: '0'
                        },
                        {
                            key: 'D1',
                            type: 3,
                            value: '0',
                            children: {
                                type: 'array',
                                value: [
                                    [
                                        {
                                            key: 'soces',
                                            type: 1,
                                            value: '100'
                                        }
                                    ]
                                ]
                            }
                        }
                    ]
                ]

            }
        }
    },
    components: {
        Digui,
        jsonview
    }
}
</script>
