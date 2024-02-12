export default class StoriApiService {
  constructor($axios) {
    this.$axios = $axios;
    if(process.client){
      this.token = localStorage.getItem('auth-token')
    }
  }

  async addExpenses(payload) {
    return await this.$axios.$post(`/api/v1/base/expense`, payload, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  });
  }

  async getAllExpenses() {
    return await this.$axios.$get(`/api/v1/base/expenses`, {
    headers: {
       'Content-Type': 'application/json',
'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  });
  }

  async updateMonthlyTarget(payload) {
    return await this.$axios.$post(`/api/v1/base/monthly-target`, payload, {
    headers: {
      'Content-Type': 'application/json',
'Accept': 'application/json',
      'Authorization': `Bearer ${this.token}`,
    }
  });
  }
}
