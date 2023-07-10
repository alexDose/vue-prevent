<template>
    <div class="post">
      <div>{{ post.id }}</div>
      <div>
        <div>title: <strong>{{ post.title }}</strong></div>
        <div>descriptions: <strong>{{ post.body }}</strong></div>
      </div>
      <div class="btns">
        <my-button @click="$router.push(`/posts/${post.id}`)">edit</my-button>
        <my-button @click="$emit('remove', post)">delete</my-button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style scoped>
.post {
  margin: 10px 0;
  padding: 10px 15px;
  border: 2px solid teal;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.btns {
  display: flex;
}
</style>
