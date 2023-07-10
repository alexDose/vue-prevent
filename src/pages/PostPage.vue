<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Search"/>
    <div class="btns">
      <my-button @click="showDialog">Создать пост</my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        v-bind:posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isLoading"
    />
    <div v-else>...loading</div>
    <!--    //Pagination-->
    <!--    <div class="pageBox">-->
    <!--      <div-->
    <!--          @click="changePage(pageNumber)"-->
    <!--          class="page"-->
    <!--          :class="{-->
    <!--        'currentPage': pageNumber === page-->
    <!--          }"-->
    <!--          :key="pageNumber"-->
    <!--          v-for="pageNumber in totalPages"-->
    <!--      >-->
    <!--        {{ pageNumber }}-->
    <!--      </div>-->
    <!--    </div>-->

  </div>
  <div ref="observer" class="observer"></div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from 'axios';
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, MySelect, PostList, MyButton, MyDialog, PostForm},
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'По названию'},
        {value: 'body', name: 'По содержимому'},
      ]
    }
  },
  methods: {
    createPost(post) {
      if (!post) return
      this.posts.push(post)
      this.dialogVisible = false
    },
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true
    },
    changePage(pageNumber) {
      this.page = pageNumber
      this.fetchPosts()
    },
    async fetchPosts() {
      try {
        this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data
      } catch (e) {
        alert('error')
      } finally {
        this.isLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page += 1
        // this.isLoading = true
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...response.data]
      } catch (e) {
        alert('error')
      } finally {
        // this.isLoading = false
      }
    }
  },
  mounted() {
    this.fetchPosts()
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        this.loadMorePosts()
      }
    }

    let observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer)
  },
  computed: {
    sortedPost() {
      return [...this.posts].sort((a, b) => a[this.selectedSort]?.localeCompare(b[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPost.filter(post => post.title.toUpperCase().includes(this.searchQuery.toUpperCase()))
    }
  },
  watch: {}
}
</script>

<style>

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button + button {
  margin-left: 10px;
}

.btns {
  display: flex;
  justify-content: space-between;
}

.pageBox {
  display: flex;
}

.page {
  padding: 8px 12px;
  border: 1px solid #000;
  margin-right: 5px;
}

.currentPage {
  border: 2px solid teal;
  color: teal;
}

.observer {
  height: 5px;
  background-color: teal;
}
</style>
