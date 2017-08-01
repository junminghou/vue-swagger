export default {
    EmptyDef(val, def) {
        if (this.IsNullOrEmpty(val)) {
            if (this.IsNull(def)) {
                return ''
            }
            return def
        }
        return val
    },
    IsNull(val) {
        if (val === null || val === undefined) {
            return true
        }

        return false
    },
    IsNullOrEmpty(val, returnVal) {
        if (val === null || val === undefined || val === '') {
            return true
        }

        return false
    },
    EntityToUrl(entity, delFirstChar, formatArray) {
        var url = ''
        var char = '&'
        var isDelete = this.IsNullOrEmpty(delFirstChar) ? false : delFirstChar
        formatArray = this.EmptyDef(formatArray, '&')

        if (entity.constructor === Object) {
            for (var key in entity) {
                var values = entity[key]

                if (this.IsNullOrEmpty(values)) {
                    continue
                }

                if (values.constructor === Array) {
                    var joinValue = ''
                    for (var i = 0; i < values.length; i++) {
                        if (formatArray === '&') {
                            url += (char + key + '=' + values[i])
                        } else if (formatArray === ',') {
                            joinValue += ',' + values[i]
                        }
                    }

                    if (formatArray === ',') {
                        url += (char + key + '=' + joinValue.substr(1))
                    }
                    continue
                }

                // 非Array执行
                url += (char + key + '=' + values)
            }

            if (isDelete && url.length > 1 && url.substr(0, 1) === '&') {
                url = url.substr(1)
            }
        }

        return url
    }
}
