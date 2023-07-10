<template>
  <input v-focus :value="modelValue" @input="updateInput" type="text">
</template>

<script>
export default {
  name: "my-input",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid teal;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
