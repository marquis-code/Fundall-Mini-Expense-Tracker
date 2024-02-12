<template>
  <main class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-screen space-y-20 lg:space-y-32">
    <nav class="flex justify-between items-center py-3">
      <div>
        <nuxt-link to="/"><img src="@/assets/icons/logo.svg" alt="logo" /></nuxt-link>
      </div>
      <div class="flex justify-between items-center gap-x-6">
        <NuxtLink class="text-black font-semibold py-2.5 text-sm" to="/login">LOG IN</NuxtLink>
        <NuxtLink class="bg-[#4CE895] font-semibold py-2.5 lg:py-3 px-4 rounded-lg text-sm" to="/signup">SIGN UP</NuxtLink>
      </div>
    </nav>
    <section class="">
      <div class="flex justify-center items-center flex-col space-y-10">
        <div>
          <img src="@/assets/icons/home.svg" alt="home page animation" />
        </div>
        <div class="text-center space-y-3">
          <h1 class="text-3xl font-semibold">Fundall Expense Tracker</h1>
          <p class="text-lg">Mini Project Frontend</p>
        </div>
        <p class="font-semibold text-sm">by Babatunde Fashola</p>
      </div>
    </section>
  </main>
</template>
