export default function ({ app, redirect }) {
  let token = null
  if(process.client){
    token = window.localStorage.getItem('auth-token');
  }
  if (!token) {
    return redirect('/login');
  }

}
