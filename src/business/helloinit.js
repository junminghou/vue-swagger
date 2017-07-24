export function _created(page) {
  var inputUrl = sessionStorage.getItem('inputUrl')
  if (inputUrl !== null && inputUrl !== undefined && inputUrl !== '') {
      page.input = inputUrl
    }
  var leftList = sessionStorage.getItem('leftList')
  if (leftList !== null && leftList !== undefined && leftList !== '') {
      page.tags = JSON.parse(leftList)
    }
  var rightForm = sessionStorage.getItem('rightForm')
  if (rightForm !== null && rightForm !== undefined && rightForm !== '') {
      page.elements = JSON.parse(rightForm)
    }
  var swaggerJson = sessionStorage.getItem('swaggerJson')
  if (swaggerJson !== null && swaggerJson !== undefined && swaggerJson !== '') {
      page.resData = JSON.parse(swaggerJson)
    }
}

export function _clearSession() {
  sessionStorage.removeItem('inputUrl')
  sessionStorage.removeItem('leftList')
  sessionStorage.removeItem('rightForm')
  sessionStorage.removeItem('swaggerJson')
}
