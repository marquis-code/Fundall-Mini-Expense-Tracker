import AuthApiService from '~/services/auth';
import ExpensesApiService from '~/services/expenses';

export default ({ $axios }, inject) => {
  const authApiService = new AuthApiService($axios);
  const expensesApiService = new ExpensesApiService($axios);
  inject('authApiService', authApiService);
  inject('expensesApiService', expensesApiService);
};
