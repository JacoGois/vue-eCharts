<template>
  <span :class="badgeClasses" @click="handleBadgeClick(badgeValue)">
    {{ text }}
  </span>
</template>

<script>
  export default {
    name: 'Badge',
    props: {
      handleBadgeClick: {
        type: Function,
        default: () => {},
      },
      text: String,
      badgeValue: String,
      select: String
    },
    computed: {
      badgeClasses() {
        return {
          'bg-primary-100 dark:bg-gray-700 dark:text-darkPrimary text-primary': this.select === this.badgeValue,
          'cursor-pointer hover:opacity-50 transition-all p-1 text-sm text-gray-500 bg-gray-150 dark:bg-gray-500 dark:text-gray-200 rounded-md light:opacity-70 font-semibold': true,
        }
      },
  },
  }
</script>