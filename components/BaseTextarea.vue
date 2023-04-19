<template>
  <div class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <textarea
     rows="4"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    >{{ modelValue }}
    </textarea>
  </div>
</template>

<script setup lang="ts">
defineProps({
    label: {
        type: [String, Boolean], default: false
    }, 
    modelValue: {
        type: String, default: ""
    }
})
</script>
<style scoped>
.input-wrap {
  display: flex;
  flex-direction: column;
}
.input-wrap input {
  padding: 8px 12px;
  font-size: 16px;
}
</style>
