<template>
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
</template>

<script>
export default {
  props: {
    hardCodedList: {
      type: Array,
      default: []
    }
  }
}
</script>
