//单独导出 capitalize 函数，使用时需要import并在methods中引入
// export const capitalize = (str) => {
//   return str.charAt(0).toUpperCase() + str.slice(1)
// }

const Tool = {
  /**
   * 忽略大小写获取对象属性值 (递归)
   */
  getValueIgnoreCase(obj, key) {
    if (!obj || typeof obj !== 'object') return undefined
    const lowerKey = key.toLowerCase()
    for (const k in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, k)) {
        if (k.toLowerCase() === lowerKey) return obj[k]
        if (typeof obj[k] === 'object' && obj[k] !== null) {
          const val = Tool.getValueIgnoreCase(obj[k], key)
          if (val !== undefined) return val
        }
      }
    }
    return undefined
  },

  /**
   * 判断是否为开发环境 (Vite 语法)
   */
  isDev() {
    // Vue 3 + Vite 通常使用 import.meta.env
    return import.meta.env.DEV
  },

  /**
   * 防抖点击判断
   */
  _debounceTimeout: null,
  isClickable() {
    if (this._debounceTimeout) return false
    this._debounceTimeout = setTimeout(() => {
      this._debounceTimeout = null
    }, 3000)
    return true
  },

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  },
}

export default Tool
