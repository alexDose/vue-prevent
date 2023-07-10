<template>
  <div v-if="posts.length">
    <h3>Список пользователей</h3>
    <TransitionGroup name="list">
      <post-item
          :key="post.id"
          :post="post"
          v-for="post in posts"
          @remove="$emit('remove', post)"
      />
    </TransitionGroup>
  </div>
  <div v-else>
    <h3>Список пользователей пуст!</h3>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    }
  }
}
</script>

<style scoped>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.7s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
