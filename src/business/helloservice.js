export function _loadForm(result, resData, path) {
    var data = resData.paths[path]
    var params = []
    if (data != null && data.hasOwnProperty('get')) {
        params = data.get.parameters
        for (var i = 0; i < params.length; i++) {
            var element = params[i]
            result.push({
                name: element.name,
                description: element.description,
                selected: 'text',
                required: element.required,
                type: element.type,
                nameformat: '{{' + propertyKey + '}}'
            })
        }
    } else if (data != null && data.hasOwnProperty('post')) {
        var refClass = data.post.parameters[0].schema.$ref.split('/')[2]
        var obj = resData.definitions[refClass]
        var properties = obj.properties
        var requireds = obj.required || []
        for (var propertyKey in properties) {
            var propertyValue = properties[propertyKey]
            var type = propertyValue.type
            var selected = 'text'
            if (propertyValue.format === 'date-time') {
                type = 'datetime'
                selected = 'datepicker'
            }
            var required = (requireds.indexOf(propertyKey) > -1) ? propertyKey : '0'
            result.push({
                name: propertyKey,
                description: propertyValue.description,
                selected: selected,
                required: required,
                type: type,
                nameformat: '{{' + propertyKey + '}}'
            })
        }
    }
}

export function _onSubmit2(current) {
    var keys = []
    if (current.filterPageKeys !== '' && current.filterPageKeys.length > 0) {
        keys = current.filterPageKeys.split('\n')
    }
    var str = ''
    var divArray = current.$refs.renderResults2

    for (var j = 0; j < keys.length; j++) {
        var key = keys[j]

        for (var i = 0; i < divArray.length; i++) {
            var element = divArray[i]

            if (element.title.indexOf(key) > -1 || key.indexOf(element.title) > -1) {
                str += element.innerText
            }
        }
    }

    current.htmlData = str
}

export function _onSubmit3(current) {
    var keys = []
    if (current.filterPageKeys !== '' && current.filterPageKeys.length > 0) {
        keys = current.filterPageKeys.split('\n')
    }
    var str = ''
    var divArray = current.$refs.renderResults3

    for (var j = 0; j < keys.length; j++) {
        var key = keys[j]

        for (var i = 0; i < divArray.length; i++) {
            var element = divArray[i]

            if (element.title.indexOf(key) > -1 || key.indexOf(element.title) > -1) {
                str += element.innerText
            }
        }
    }

    current.htmlData = str
    console.log(current.$refs.renderResults2)
}

export function _getJson(data) {
    var tags = data.tags
    var paths = data.paths
    var index = 0
    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i]
        tag.paths = []
        for (var key in paths) {
            if (paths.hasOwnProperty(key)) {
                if (key.indexOf('/' + tag.name + '/') > -1) {
                    var path = paths[key]
                    var type = ''
                    var summary = ''
                    if (path.hasOwnProperty('get')) {
                        type = 'Get'
                        summary = path.get.summary
                    } else if (path.hasOwnProperty('post')) {
                        type = 'Post'
                        summary = path.post.summary
                    } else if (path.hasOwnProperty('put')) {
                        type = 'Put'
                        summary = path.put.summary
                    } else if (path.hasOwnProperty('delete')) {
                        type = 'Del'
                        summary = path.delete.summary
                    }
                    if (summary === '' || summary === undefined || summary === null) {
                        summary = '无描述'
                    }

                    var pathArray = key.split('/')
                    pathArray.splice(0, 2)
                    var shortpath = pathArray.join('/')

                    var tagPath = {
                        path: key,
                        short_path: shortpath,
                        type: type,
                        summary: summary,
                        index: ++index
                    }
                    tag.paths.push(tagPath)
                }
            }
        }
    }
}
