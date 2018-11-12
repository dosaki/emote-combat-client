export const getAllCookies = () => {
  return document.cookie.split(';')
    .filter((cookie) => {
      return cookie.trim().startsWith('ec-')
    })
    .reduce((acc, cookie) => {
      acc[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim()
      return acc
    }, {})
}

export const setCookie = (name, value, seconds) => {
  if (seconds) {
    const cookie = []
    const date = new Date()
    date.setTime(date.getTime() + (seconds * 1000))
    cookie.push(`ec-${name}=${(value || '')}`)
    cookie.push(`expires=${date.toUTCString()}`)
    cookie.push('path=/')
    document.cookie = cookie.join('; ')
  } else {
    console.error(`failed to set cookie ${name}`)
  }
}

export const getCookie = (name) => {
  return getAllCookies()[`ec-${name}`]
}

export const eraseCookie = (name) => {
  document.cookie = `ec-${name}=;Max-Age=-99999999;`
}

export default { getAllCookies, setCookie, getCookie, eraseCookie }
