export default {
    loadRequestData: function (result, resData, path) {
        var data = resData.paths[path]
        if (data === null || data === undefined) {
            return
        }

        var request = null
        if (data.hasOwnProperty('get')) {
            request = data.get
        } else if (data.hasOwnProperty('post')) {
            request = data.post
        } else if (data.hasOwnProperty('delete')) {
            request = data.delete
        } else if (data.hasOwnProperty('put')) {
            request = data.put
        }
        if (request === null) {
            return
        }

        var params = request.parameters
        for (var i = 0; i < params.length; i++) {
            var element = params[i]
            if (element.in === 'body') {
                this.pushBody(resData, request, result)
                continue
            }
            result.push({
                name: element.name,
                description: element.description,
                selected: 'text',
                required: element.required,
                type: element.type,
                nameformat: '{{' + element.name + '}}',
                in: element.in
            })
        }
    },
    pushBody: function (resData, request, result) {
        var refClass = request.parameters[0].schema.$ref.split('/')[2]
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
                nameformat: '{{' + propertyKey + '}}',
                in: 'body'
            })
        }
    },
    getRequestJson: function (data) {
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
        return tags
    }
}
