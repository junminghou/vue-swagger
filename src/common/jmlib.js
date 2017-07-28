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
    }
}
