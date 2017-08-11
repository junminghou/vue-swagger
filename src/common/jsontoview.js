export default function jsontoview(responsedata) {
    var result = { isroot: true, value: [] }
    if (responsedata.constructor === Object) {
        result.type = 'object'
    } else if (responsedata.constructor === Array) {
        result.type = 'array'
    }

    convert(responsedata, result.value)
    return result
}

function convert(data, result) {
    var arrayvalue = []
    for (var key in data) {
        var entity = {}
        var child = data[key]
        if (child === null) {
            entity.key = key
            entity.type = 0
            entity.value = 'null'
        } else if (child.constructor === Object) {
            entity.key = key
            entity.type = 2
            entity.children = {}
            entity.children.type = 'object'
            entity.children.value = []
            convert(child, entity.children.value)
        } else if (child.constructor === Array) {
            entity.key = key
            entity.type = 3
            entity.children = {}
            entity.children.type = 'array'
            entity.children.value = []
            for (var i = 0; i < child.length; i++) {
                convert(child[i], entity.children.value)
            }
        } else if (child.constructor === String) {
            entity.key = key
            entity.type = 1
            entity.value = child
        } else {
            entity.key = key
            entity.type = 0
            entity.value = child
        }
        arrayvalue.push(entity)
    }
    result.push(arrayvalue)
}
