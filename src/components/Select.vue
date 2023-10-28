<!-- Select.vue -->
<template>
  <div class="flex items-center dark:text-white">
    <select v-model="selected" class="px-2 py-1 dark:bg-darkSurface rounded-md border-gray-500 border">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data() {
    return {
      selected: localStorage.getItem('app:theme') ?? 'light'
    }
  },
  props: {
    options: Array,
    handleChange: Function
  },
  watch: {
    selected() {
      this.handleChange(this.selected)
    },
  },
};
</script>
