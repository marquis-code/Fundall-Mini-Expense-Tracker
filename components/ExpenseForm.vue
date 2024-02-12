<template>
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
          @focus="isAmountFieldFocused = true" @blur="isAmountFieldFocused = false" type="tel" v-model="payload.amount"
          placeholder="Enter Amount" />
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
              class="py-3 px-3 focus:border-green-500 outline-none rounded-sm w-full text-sm lg:text-base"
              placeholder="Enter Amount" />
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
</template>

<script>
export default {
  data() {
    return {
      isAmountFieldFocused: false,
      isDateFieldFocused: false,
      processingNewExpenses: false,
      payload: {
        date: '',
        amount: ''
      },
      items: [
        { id: 1, description: '', amount: 0 },
        { id: 2, description: '', amount: 0 },
        { id: 3, description: '', amount: 0 },
      ]
    }
  },
  methods: {
    async handleAddExpenses() {
      this.processingNewExpenses = true
      await this.$expensesApiService.addExpenses(this.payload)
        .then((response) => {
          this.$toastr.s('New Expense was created successfully!')
          this.fetchExpenses()
        }).catch((error) => {
          this.$toastr.e(error.response.data.error)
          if (error.response.data.code === 'BAD_METHOD') {
            const randomId = Math.floor(Math.random() * 90) + 10;
            const newData = {
              id: randomId,
              date: this.$moment(this.payload.date).format('DD MMM, YYYY'),
              amount: Number(this.payload.amount)
            }
            this.$emit('errorByPassAction', newData)
            this.payload.date = ''
            this.payload.amount = ''
          }
        }).finally(() => {
          this.processingNewExpenses = false
        })
    },
  },
  computed: {
    formattedUser() {
      return this.user ? `${this.user.firstname} ${this.user.lastname}` : 'User'
    },
    total() {
      return this.items.reduce((sum, item) => sum + item.amount, 0);
    },
    isFormEmpty() {
      return !!(this.payload.amount && this.payload.date)
    }
  },
  props: {
    user: {
      type: Object,
      required: true,
    }
  }
}
</script>
