<template>
  <div class="text-base text-gray-500 font-sans min-h-screen flex items-center justify-center  dark:bg-darkBackground bg-background ">
    <div class="border shadow-lg rounded-lg bg-surface dark:bg-darkSurface dark:border-none dark:text-white px-3 py-4 w-[80%] md:w-[60%]">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
        <h4 class="text-xl font-semibold">Tempo de Acesso</h4>
        <div class="flex flex-col sm:flex-row sm:items-center gap-2">
          <div class="flex items-center gap-2">
            <Badge text="Hoje" :handleBadgeClick="handleBadge" badgeValue="TODAY" :select="selectedBadge" />
            <Badge text="7d" :handleBadgeClick="handleBadge" badgeValue="SEVEN" :select="selectedBadge" />
            <Badge text="30d" :handleBadgeClick="handleBadge" badgeValue="THIRTY" :select="selectedBadge" />
            <Badge text="1a" :handleBadgeClick="handleBadge" badgeValue="ONE_YEAR" :select="selectedBadge" />
          </div>
          <Select class="sm:mx-2" :selectValue="selectValue" :options="optionsSelect" :handleChange="handleChangeSelect" />
        </div>
      </div>
      <p class="text-gray-300 mt-2 md:mt-0">Veja o tempo de acesso médio para cada plataforma</p>
      <Chart :selectedBadge="selectedBadge" />
    </div>
  </div>
</template>
<script>
  import Badge from './components/Badge.vue'
  import Select from './components/Select.vue'
  import Chart from './components/Chart.vue'

  export default {
    name: 'App',
    components: {
      Badge,
      Select,
      Chart
    },
    data() {
      return {
        selectedBadge: 'TODAY',
        optionsSelect: [{value: 'light', label: 'Claro'}, {value: 'dark', label: 'Escuro'}],
        selectValue: 'light',
      }
    },
    methods: {
      handleBadge(badgeValue) {
        this.selectedBadge = badgeValue
      },
      handleChangeSelect(value) {
        this.selectValue = value
      },
      handleTheme() {
        document.documentElement.classList.toggle('dark')
        if (this.selectValue === 'dark') {
          this.selectValue = 'light'
          localStorage.setItem('app:theme', 'light')
        } else {
          this.selectValue = 'dark'
          localStorage.setItem('app:theme', 'dark')
        }
      }
    },
    mounted() {
      const localStorageTheme = localStorage.getItem('app:theme')
      this.selectValue = localStorageTheme
      document.documentElement.classList.add(localStorageTheme)
    },
    watch: {
      selectValue() {
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add(this.selectValue)
        localStorage.setItem('app:theme', this.selectValue)
      }
    }
  }
</script>
