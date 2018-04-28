import request from '@/utils/request'

export function login(username, password) {
  const userId = 'fadfqfadfadsfadfadfadfer3233'
  return request({
    // url: '/user/login',
    url: '/login',
    method: 'post',
    data: {
      // email: username,
      // password
      userId
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
