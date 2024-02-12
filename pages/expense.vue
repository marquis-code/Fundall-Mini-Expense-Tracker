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
              <ExpenseTable :hardCodedList="hardCodedList" />
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
        <ExpenseForm @errorByPassAction="handleErrorByPass" :user="user" />
      </div>
    </section>
  </main>
</template>

<script>
import ExpenseTable from '@/components/ExpenseTable.vue'
import ExpenseForm from '@/components/ExpenseForm.vue'
export default {
  middleware: 'auth',
  components: {
    ExpenseTable,
    ExpenseForm
  },
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
      expensesList: [],
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
    handleErrorByPass(data) {
      console.log(data, 'emit')
      this.hardCodedList = [...this.hardCodedList, {
        id: data.id,
        amount: data.amount,
        date: data.date
      }]
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
  height: 70px;
}

input[type="file"] {
  display: none;
}
</style>
