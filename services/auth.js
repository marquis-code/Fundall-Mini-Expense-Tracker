export default class AuthApiService {
  constructor($axios) {
    this.$axios = $axios;
    this.user = ''
    if(process.client){
      this.token = window.localStorage.getItem('auth-token')
    }
    this.isAuthenticated = false
  }

  saveUserObject(newUser){
    this.user = newUser;
    if (newUser && process.client) {
      const stringifiedUser = JSON.stringify(newUser)
      window.localStorage.setItem('auth-user', stringifiedUser)
    } else {
      this.user = ''
    }
  }

  checkAuth() {
    user.value = JSON.parse(auth_user.value);
    this.isAuthenticated = !! this.isAuthenticated
  }

  setToken(newToken){
    this.token = newToken;
    this.isAuthenticated = true;
    if(process.client){
      window.localStorage.setItem('auth-token', newToken)
    }
  }

  async login(data) {
    try {
      const response = await this.$axios.$post(`/api/v1/login`, data);
      if (response.success) {
        const { access_token, ...userObject } = response.success.user;
        this.saveUserObject(userObject);
        this.setToken(response?.success?.user?.access_token);
      }
      return response
    } catch (error) {
      return error
    }
  }

  register(payload){
    return this.$axios.$post(`/api/v1/register`, payload);
  }

  getProfile(token){
    return this.$axios.$get(`/api/v1/base/profile`, {
    headers: {
      'Content-Type': 'application/json',
       'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  });
  }

  updateProfile(payload){
    return this.$axios.$post(`/api/v1/base/avatar`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  });
  }
}
