<template>
  <main class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-3 space-y-6">
    <div>
      <nuxt-link to="/"><img src="@/assets/icons/logo.svg" alt="logo" /></nuxt-link>
    </div>
    <section class="lg:flex lg:gap-x-32">
      <div class="w-full lg:w-5/12 space-y-8">
        <div class="flex items-end gap-x-6">
          <div class="avatar-wrapper">
            <div class="cursor-pointer bg-gray-200 flex justify-center items-center overflow-hidden"
              @click="triggerUpload">
              <img v-if="imageUrl" :src="imageUrl" alt="Uploaded image"
                class="rounded-md p-3  bg-[#C4C4C4] cursor-pointer">
              <span v-else class="text-gray-700">Click to upload an image</span>
            </div>
            <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="image/*">
          </div>
          <div class="">
            <h1 class="font-semibold text-lg py-0 my-0">{{ formattedUser }}</h1>
            <p class="py-0 my-0 text-gray-500">{{ formattedEmail }}</p>
          </div>
        </div>
        <div class="space-y-2">
          <p class="text-[#30443C]">Target Monthly Expenses</p>
          <h1 class="text-xl font-bold text-gray-900">{{ formattedTotal }}</h1>
          <div class="w-full bg-[#EFEFEF] rounded-full h-2">
            <div :style="{ width: progressPercentage + '%' }" class="bg-[#4DE897] h-2 rounded-full"></div>
          </div>
        </div>
        <div class="shadow rounded-md bg-white shadow-green-300 p-6 space-y-6">
          <p class="text-sm font-medium">Daily Expenses Summary</p>
          <div class="px-4 sm:px-6 lg:px-8">
            <div class="" v-if="!!expensesList">
              <table class="whitespace-nowrap lg:text-left w-full">
                <colgroup>
                  <col class="w-full lg:w-2/12">
                  <col class="w-full lg:w-5/12">
                  <col class="w-full lg:w-5/12">
                </colgroup>
                <thead class="border-b border-white/10 text-sm leading-6">
                  <tr>
                    <th scope="col" class="py-2 pl-0 pr-8 font-medium"></th>
                    <th scope="col" class="py-2 pl-0 pr-8 font-medium">Date</th>
                    <th scope="col" class="py-2 pl-0 pr-8 font-medium sm:table-cell">Amount</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5 text-gray-900">
                  <tr v-for="item in hardCodedList" :key="item.id" class="">
                    <td class="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8">
                      <div class="lg:flex items-center  justify-end gap-x-2 sm:justify-start">
                        <div class="flex-none rounded-full p-1 inline text-green-400 bg-green-400/10">
                          <div class="h-2 w-2 rounded-full bg-current"></div>
                        </div>
                      </div>
                    </td>
                    <td class="lg:py-4 pr-8 ">
                      <div class="flex items-center gap-x-4">
                        <div class="truncate text-[#30443C] text-xs md:text-sm font-medium leading-6">{{ item.date }}</div>
                      </div>
                    </td>
                    <td class="py-4 pl-0 pr-4 sm:table-cell">
                      <div class="flex gap-x-3">
                        <div class="text-xs md:text-sm leading-6 text-[#4DE897]">{{ item.amount.toLocaleString('en-NG', {
                          style: 'currency',
                          currency: 'NGN'
                        }) }}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else>
              <div class="flex justify-between items-center">
                <p class="text-sm font-medium">Date</p>
                <p class="text-sm font-medium">Amount</p>
              </div>
              <div class="flex justify-center items-center py-20">
                <img src="@/assets/icons/empty-state.svg" alt="empty state" />
              </div>
            </div>

          </div>
        </div>
      </div>
      <div class="w-full lg:w-7/12">
        <form @submit.prevent="handleAddExpenses" class="bg-[#F2F3F7] shadow-lg rounded-md space-y-6 px-3 lg:px-16 py-10">
          <div class="bg-white relative px-2 lg:px-10 py-6 rounded-lg">
            <div class="lg:hidden">
              <img src="@/assets/icons/header.svg" alt="logo" class="lg:absolute -top-8 right-0" />
            </div>
            <div>
              <h1 class="text-2xl font-semibold">
                <span class="text-[#4DE897] font-semibold">Welcome back</span>,
                {{ formattedUser }}
              </h1>
              <p class="text-[#30443C] text-sm lg;text-base">
                Now, let’s get your expenses for this month
              </p>
            </div>
            <div class="">
              <img src="@/assets/icons/header.svg" alt="logo" class="lg:absolute hidden lg:block pt-6 lg:pt-0 -top-8 right-0" />
            </div>
          </div>
          <div class="space-y-7">
            <div class="space-y-2">
              <label :class="isAmountFieldFocused ? 'text-green-500' : 'text-black'" class="text-sm lg:text-base">Target Monthly
                Expenses</label>
              <input :class="isAmountFieldFocused ? 'border-green-500' : 'border-gray-300'"
                class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
                @focus="isAmountFieldFocused = true" @blur="isAmountFieldFocused = false" type="tel"
                v-model="payload.amount" placeholder="Enter Amount" />
            </div>
            <div class="space-y-2">
              <label :class="isDateFieldFocused ? 'text-green-500' : 'text-black'" class="text-sm lg:text-base">Date</label>
              <input type="date" :class="isDateFieldFocused ? 'border-green-500' : 'border-gray-300'"
                class="py-3 rounded-md px-4 placeholder:text-sm outline-none border-[0.6px] w-full placeholder:text-gray-500 "
                @focus="isDateFieldFocused = true" @blur="isDateFieldFocused = false" v-model="payload.date"
                placeholder="Enter Date" />
            </div>
            <div class="space-y-2">
              <label class="text-[#30443C] text-sm lg:text-base">Today’s Expenses</label>
              <div class="space-y-6">
                <div class="flex justify-between items-center gap-x-8" v-for="item in items" :key="item.id">
                  <input v-model="item.description" placeholder="Enter Item"
                    class="py-3 px-3 focus:border-green-500 outline-none rounded-sm w-full text-sm lg:text-base" />
                  <input v-model.number="item.amount"
                    class="py-3 px-3 focus:border-green-500 outline-none rounded-sm w-full text-sm lg:text-base" placeholder="Enter Amount" />
                </div>
              </div>
            </div>
            <div class="flex justify-end items-end">
              <div class="flex justify-end items-end">
                <div class="flex items-center gap-x-3">
                  <label class="text-sm lg:text-base">Total Actual Expenses: </label>
                  <div class="">
                    <span class="py-2.5 px-6 rounded-md bg-white text-xl font-semibold">{{ total.toLocaleString('en-NG', {
                      style: 'currency', currency: 'NGN'
                    }) }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-center items-d">
              <button :disabled="processingNewExpenses || !isFormEmpty" type="submit"
                class="text-black text-sm lg:text-base bg-[#4DE897] disabled:cursor-not-allowed disabled:opacity-25 rounded-xl border-4 border-white py-3 px-10 font-medium">
                {{ processingNewExpenses ? 'processing...' : 'SAVE TODAY’S EXPENSES' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      fileInput: null,
      processingNewExpenses: false,
      imageUrl: '',
      defaultAvatar: '@/assets/icons/user.svg',
      userAvatar: null,
      metadata: {},
      profileInfo: null,
      user: null,
      payload: {
        date: '',
        amount: ''
      },
      expensesList: [],
      items: [
        { id: 1, description: '', amount: 0 },
        { id: 2, description: '', amount: 0 },
        { id: 3, description: '', amount: 0 },
      ],
      isAmountFieldFocused: false,
      isDateFieldFocused: false,
      hardCodedList: [
        {
          id: 1,
          date: '30 Nov, 2018',
          amount: 30000
        },
        {
          id: 2,
          date: '30 Nov, 2018',
          amount: 30000
        },
        {
          id: 3,
          date: '30 Nov, 2018',
          amount: 50000
        }
      ]
    }
  },
  methods: {
    async handleAddExpenses() {
      this.processingNewExpenses = true
      await this.$expensesApiService.addExpenses(this.payload)
        .then((response) => {
          this.$toastr.s('New Expense was created succcessfully!')
          this.fetchExpenses()
        }).catch((error) => {
          this.$toastr.e(error.response.data.error)
          if (error.response.data.code === 'BAD_METHOD') {
            const randomId = Math.floor(Math.random() * 90) + 10;
            this.hardCodedList = [...this.hardCodedList, {
              id: randomId,
              date: this.$moment(this.payload.date).format('DD MMM, YYYY'),
              amount: Number(this.payload.amount)
            }]
            this.payload.date = ''
            this.payload.amount = ''
          }
        }).finally(() => {
          this.processingNewExpenses = false
        })
    },
    triggerUpload() {
      this.$refs.fileInput.click();
    },
    fetchExpenses() {
      this.$expensesApiService.getAllExpenses().then((response) => {
        this.expensesList = response.data.success.data
        const { data, ...metaProperties } = response.data.success
        this.metadata = metaProperties
      }).catch((error) => {
        this.$toastr.e(error.response.data.error.message)
        if (error.response.data.status === 'ERROR') {
          this.expensesList = this.hardCodedList
        }
      })

    },
    getUserData() {
      this.$authApiService.getProfile().then((res) => {
        this.profileInfo = res.data.success.data
      })
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      this.uploadImage(file);
    },
    async uploadImage(file) {
      const formData = new FormData();
      formData.append('avatar', file);

      this.$authApiService.updateProfile(formData).then(() => {
        this.getUserData()
      }).catch((error) => {
        this.$toastr.e(error.response.data.error.message)
      })
    }
  },
  computed: {
    isFormEmpty() {
      return !!(this.payload.amount && this.payload.date)
    },
    total() {
      return this.items.reduce((sum, item) => sum + item.amount, 0);
    },
    formattedUser() {
      return this.user ? `${this.user.firstname} ${this.user.lastname}` : 'User'
    },
    formattedEmail() {
      return this.user ? this.user.email : 'N/A'
    },
    totalSum() {
      return this.hardCodedList.reduce((acc, itm) => acc + itm.amount, 0)
    },
    progressPercentage() {
      const goal = 500000;
      const current = this.totalSum;
      const percentage = (current / goal) * 100;
      return Math.min(percentage, 100);
    },
    formattedTotal() {
      return this.user ? this.totalSum.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) : 'NGN 0.00'
    },
    isUserExpensesAvailable() {
      return !!this.user.monthly_target
    }
  },
  mounted() {
    const user = localStorage.getItem('auth-user')
    if (user) {
      this.user = JSON.parse(user)
      this.fetchExpenses()
      this.getUserData()
      this.imageUrl = this.user.avatar;
    }
  }

}
</script>

<style scoped>
.avatar-wrapper img {
  width: 70px;
  /* Example size */
  height: 70px;
  /* Example size */
}

input[type="file"] {
  display: none;
}
</style>
