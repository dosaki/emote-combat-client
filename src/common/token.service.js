import { getCookie, setCookie, eraseCookie } from '@/common/cookie.service'

const ID_TOKEN_KEY = 'token-id'
const EXPIRY_TOKEN_KEY = 'token-expiresAt'
const ASSOCIATED_USER_TOKEN_KEY = 'token-associatedUser'

const validateToken = () => {
  const expiresAt = getCookie(EXPIRY_TOKEN_KEY)
  if (expiresAt <= new Date().getTime()) {
    destroyToken()
  }
}

export const getToken = () => {
  validateToken()
  return getCookie(ID_TOKEN_KEY)
}

export const getCurrentUser = () => {
  validateToken()
  return getCookie(ASSOCIATED_USER_TOKEN_KEY)
}

export const saveToken = (token, expiresAt, userID) => {
  const expiresAtMilliseconds = Number(expiresAt) * 1000
  const duration = expiresAtMilliseconds - new Date().getTime()
  setCookie(EXPIRY_TOKEN_KEY, expiresAtMilliseconds, duration)
  setCookie(ID_TOKEN_KEY, token, duration)
  setCookie(ASSOCIATED_USER_TOKEN_KEY, userID, duration)
}

export const destroyToken = () => {
  eraseCookie(EXPIRY_TOKEN_KEY)
  eraseCookie(ID_TOKEN_KEY)
  eraseCookie(ASSOCIATED_USER_TOKEN_KEY)
}

export const hasToken = () => {
  return !!getToken()
}

export default { getToken, saveToken, destroyToken, hasToken, getCurrentUser }
