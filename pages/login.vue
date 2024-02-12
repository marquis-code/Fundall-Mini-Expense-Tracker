<template>
  <main class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3 space-y-6">
    <div class="px-6 lg:px-0">
      <nuxt-link to="/"><img src="@/assets/icons/logo.svg" alt="logo" /></nuxt-link>
    </div>
    <section class="lg:flex">
      <div class="lg:w-6/12 hidden lg:flex justify-center items-center flex-col space-y-10">
        <img src="@/assets/icons/login.svg" alt="home page animation" />
        <div class="space-y-3">
          <h1 class="text-4xl font-semibold max-w-sm">
            <span class="text-[#4DE897]">Welcome back!</span> We miss you.
          </h1>
        </div>
      </div>
      <div class="lg:w-6/12">
        <form @submit.prevent="handleLogin" class="bg-white shadow-lg rounded-md space-y-6 px-3 lg:px-16 py-10">
          <div>
            <h1 class="text-2xl font-bold">Holla</h1>
            <p class="font-medium text-sm lg:text-base">Sign in to the vibe!</p>
          </div>
          <div class="space-y-2">
            <label class="block text-sm lg:text-base" for="email">Email or Username</label>
            <input v-model="form.email" name="email"
              :class="{ 'border-red-500 border-[0.5pxv]': !isValidEmail && form.email.length > 0, 'border-green-500': isEmailFieldFocused }"
              @input="validateEmail" type="email" placeholder="Enter Email"
              class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
              @focus="isEmailFieldFocused = true" @blur="isEmailFieldFocused = false" />
          </div>

          <div class="space-y-2 relative">
            <label :class="isPasswordFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base"
              for="password">Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="Enter Password"
              :class="isPasswordFieldFocused ? 'border-green-500' : 'border-gray-300'"
              class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
              @focus="isPasswordFieldFocused = true" @blur="isPasswordFieldFocused = false" />
            <button type="button" @click="togglePasswordVisibility"
              class="absolute right-2 top-2/4 transform -translate-y-1/2 text-gray-600">
              <span v-if="showPassword"><img src="@/assets/icons/eye-open.svg" class="h-6 w-6" alt="eye close" /></span>
              <span v-else><img src="@/assets/icons/eye-close.svg" alt="eye open" class="h-6 w-6" /></span>
            </button>
          </div>

          <div class="w-full">
            <button type="submit" :disabled="!isFormEnabled || loading"
              class="bg-[#4DE897] py-3 text-black w-full font-semibold rounded-md shadow-md disabled:cursor-not-allowed disabled:opacity-25">
              {{ loading ? 'processing...' : 'LOGIN' }}
            </button>
          </div>
          <div class="space-y-3 font-light">
            <p class="text-center text-gray-900 text-sm lg:text-base">
              Don’t have an account?
              <nuxt-link to="/signup" class="text-[#4DE897]">Register Here</nuxt-link>
            </p>
            <p class="text-[#97A19D] text-center font-light text-sm lg:text-base">
              By clicking on Login, you agree to our
              <nuxt-link to="/" class="text-[#4DE897] font-medium">
                Terms & Conditions and Privacy Policy</nuxt-link>
            </p>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false,
      isValidEmail: true,
      showPassword: false,
      isEmailFieldFocused: false,
      isPasswordFieldFocused: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    validateEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isValidEmail = regex.test(this.form.email);
    },
    async handleLogin() {
      this.loading = true;
      this.$authApiService.login(this.form).then((itm) => {
        if (itm.success) {
          this.$toastr.s(`Welcome back ${itm.success.user.firstname}`)
        }
        this.loading = false
        this.$router.push('/expense')
      }).catch((error) => {
        this.$toastr.e('Something went wrong!')
      })
    }
  },
  computed: {
    isFormEnabled() {
      return !!(this.form.email && this.form.password);
    }
  }
}
</script>
