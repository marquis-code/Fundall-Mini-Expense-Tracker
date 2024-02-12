<template>
  <main class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3 space-y-6">
    <div class="px-6 lg:px-0">
      <nuxt-link to="/"><img src="@/assets/icons/logo.svg" alt="logo" /></nuxt-link>
    </div>
    <section class="lg:flex justify-center items-center">
      <div class="w-6/12 hidden lg:flex justify-center items-center flex-col space-y-10">
        <img src="@/assets/icons/home.svg" alt="home page animation" />
        <div class="space-y-3">
          <h1 class="text-4xl font-semibold max-w-sm">
            <span class="text-[#4DE897]">Welcome!</span> Let’s get to know you.
          </h1>
          <p class="max-w-sm">
            Your first step toward a better financial lifestyle starts here.
          </p>
        </div>
      </div>
      <div class="lg:w-6/12">
        <form @submit.prevent="handleRegister" class="bg-white shadow-lg rounded-md space-y-6 px-3 lg:px-16 py-4 lg:py-10">
          <div class="lg:flex justify-between items-center lg:gap-x-10 space-y-6 lg:space-y-0">
            <div class="w-full space-y-1">
              <label :class="isFirstNameFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base">First Name</label>
              <input type="text" v-model="form.firstname" placeholder="Enter First Name"
                class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
                :class="isFirstNameFieldFocused ? 'border-green-500' : 'border-gray-300'"
                @focus="isFirstNameFieldFocused = true" @blur="isFirstNameFieldFocused = false" />
            </div>
            <div class="w-full space-y-1">
              <label :class="isLastNameFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base">Last Name</label>
              <input type="text" v-model="form.lastname" placeholder="Enter Last Name"
                class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
                :class="isLastNameFieldFocused ? 'border-green-500' : 'border-gray-300'"
                @focus="isLastNameFieldFocused = true" @blur="isLastNameFieldFocused = false" />
            </div>
          </div>

          <div class="space-y-2">
            <label :class="isEmailFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base">Email address</label>
            <input type="email" v-model="form.email"
              :class="{ 'border-[0.5px] border-red-500': !isEmailValid, 'border-green-500': isEmailFieldFocused }"
              @input="validateEmail" placeholder="Enter Email"
              class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
              @focus="isEmailFieldFocused = true" @blur="isEmailFieldFocused = false" />
          </div>

          <div class="space-y-2 relative">
            <label :class="isPasswordFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base">Password</label>
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

          <div class="space-y-2 relative">
            <label :class="isConfirmationFieldFocused ? 'text-green-500' : 'text-black'" class="block text-sm lg:text-base">Confirm
              Password</label>
            <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation"
              placeholder="Confirm Password" :class="isConfirmationFieldFocused ? 'border-green-500' : 'border-gray-300'"
              class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
              @focus="isConfirmationFieldFocused = true" @blur="isConfirmationFieldFocused = false" />
            <button type="button" @click="toggleConfirmPasswordVisibility"
              class="absolute right-2 top-2/4 transform -translate-y-1/2 text-gray-600">
              <span v-if="showConfirmPassword"><img src="@/assets/icons/eye-open.svg" class="h-6 w-6"
                  alt="eye close" /></span>
              <span v-else><img src="@/assets/icons/eye-close.svg" class="h-6 w-6" alt="eye open" /></span>
            </button>
          </div>
          <div class="w-full">
            <button :disabled="!isFormEmpty || loading" type="submit"
              class="bg-[#4DE897] text-sm lg:text-base py-3 text-black w-full rounded-md shadow-md disabled:cursor-not-allowed disabled:opacity-25">
              {{ loading ? 'processing...' : 'SIGN UP' }}
            </button>
          </div>
          <div class="space-y-3 font-light">
            <p class="text-center text-gray-900 text-sm lg:text-base">
              Already have an account?
              <nuxt-link to="/login" class="text-[#4DE897]">Login Here</nuxt-link>
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
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      loading: false,
      isEmailValid: true,
      isFirstNameFieldFocused: false,
      isLastNameFieldFocused: false,
      isEmailFieldFocused: false,
      isPasswordFieldFocused: false,
      isConfirmationFieldFocused: false,
      showPassword: false,
      showConfirmPassword: false
    }
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    validateEmail() {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      this.isEmailValid = emailPattern.test(this.form.email);
    },
    async handleRegister() {
      this.loading = true;
      await this.$authApiService.register(this.form).then(() => {
        this.$toastr.s('Signup was successful!')
        this.loading = false
        this.$router.push('/login')
      })
    }
  },
  computed: {
    isFormEnabled() {
      return !!(this.form.firstname && this.form.lastname && this.form.email && this.form.password && this.form.password_confirmation && this.isEmailValid)
    }
  }
}
</script>

