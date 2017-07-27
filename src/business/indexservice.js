export default {
    convertModel(responseData) {
        var arraydata = []
        for (var topkey in responseData) {
            var topproperty = responseData[topkey]
            if (topproperty.$isroot && topkey !== '$isroot') {
                this.filterdata(topproperty, responseData, arraydata, 0)
            }
        }
        return arraydata
    },
    filterdata(topproperty, responseData, arraydata, type) {
        for (var key in topproperty) {
            var property = topproperty[key]
            if (property.hasOwnProperty('$ref')) {
                var ref = property.$ref.split('/')[2]
                var child = responseData[ref]
                if (child !== null && child !== undefined) {
                    topproperty[key].data = []
                    this.filterdata(child, responseData, topproperty[key].data, 1)
                    // this.appendArray(key, property, type, arraydata)
                }
                continue
            }
            this.appendArray(key, property, type, arraydata)
        }
    },
    appendArray(key, property, type, arraydata) {
        var description = ''
        if (property['description'] !== null && property['description'] !== undefined) {
            description = property['description']
        }
        var entity = {
            key: key,
            type: type,
            datatype: property['type'],
            description: description
        }
        if (arraydata !== null && arraydata !== undefined) {
            arraydata.push(entity)
        }
    },
    loadResponseData(requestjson, path) {
        var result = {}
        var apipath = this.getProtocol(requestjson.paths[path])
        if (apipath === null) {
            return null
        }
        var responsesRef = apipath.responses['200'].schema.$ref.split('/')[2]
        this.filterProperty(requestjson, responsesRef, result)
        return result
    },
    filterProperty(requestjson, responsesRef, result) {
        var responsesObj = requestjson.definitions[responsesRef]
        var properties = responsesObj.properties
        properties['$isroot'] = true
        result[responsesRef] = properties

        for (var key in properties) {
            var property = properties[key]
            if (property.hasOwnProperty('$ref')) {
                this.filterProperty(requestjson, property.$ref.split('/')[2], result)
                continue
            }

            if (property.hasOwnProperty('items')) {
                if (property.items.hasOwnProperty('$ref')) {
                    this.filterProperty(requestjson, property.items.$ref.split('/')[2], result)
                    continue
                }
            }
        }
    },
    loadRequestData(result, resData, path) {
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
    pushBody(resData, request, result) {
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
    getRequestJson(data) {
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
    },
    getProtocol(entity) {
        if (entity.hasOwnProperty('get')) {
            return entity['get']
        }
        if (entity.hasOwnProperty('post')) {
            return entity['post']
        }
        if (entity.hasOwnProperty('delete')) {
            return entity['delete']
        }
        if (entity.hasOwnProperty('put')) {
            return entity['put']
        }

        return null
    }
}
