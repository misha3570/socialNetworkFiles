import axios from "axios";


const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'fd0e6be9-4dcd-462b-8974-316cd93b8872'
  }
})


export const usersApi = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`, instance)
      .then(response => response.data)
  },
  unFollow(userId) {
    return instance.delete(`follow/${userId}`, instance)
  },
  follow(userId) {
    return instance.post(`follow/${userId}`, {}, instance)
  },
  getProfile(userId) {
    return profileApi.getProfile(userId)
  }
}

export const profileApi = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`, instance)
  },
  getStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateStatus(status) {
    return instance.put(`profile/status/`, {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put('profile/photo/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  saveProfile(profile) {
    console.log(profile)
    return instance.put(`profile`, profile)
  }
}

export const authAPI = {
  me() {
    return  instance.get('auth/me', instance)
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post('auth/login', {email, password, rememberMe, captcha}, instance)
  },
  logout() {
    return instance.delete('auth/login')
  }
}

export const securityApi = {
  getCaptchaUrl() {
    return instance.get('security/get-captcha-url')
  }
}

