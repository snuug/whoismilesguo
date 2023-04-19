<template>
  <button
    class="custom-button"
    :class="{ 'disabled': disabled }"
    @click="!disabled && onClick()"
    :disabled="disabled"
  >
    <span v-if="icon" :class="icon" aria-hidden="true"></span>
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    required: false
  },
  onClick: {
    type: Function,
    required: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>