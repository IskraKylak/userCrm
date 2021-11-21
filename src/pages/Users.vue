<template>
  <div class="container">
    <section>
      <div class="home">
        <h1>Users</h1>
        <table>
          <thead>
            <tr>
              <th @click="sort('name')">Name &#8595;</th>
              <th @click="sort('age')">Age &#8595;</th>
              <th @click="sort('gender')">Gender &#8595;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in usersSort" :key="user.id">
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.gender }}</td>
            </tr>
          </tbody>
        </table>
        <!-- <div style="text-align: center">
          <span
            >debuge: sort: {{ currentSort }}, dir: {{ currentSortDir }}</span
          >
          <p>page: {{ this.page.current }}, length: {{ this.page.length }}</p>
          <p>{{ pag }}</p>
        </div> -->
      </div>
    </section>
    <section>
      <div class="container">
        <div class="button_list">
          <div class="btn btnPrimary" @click="prevPage">&#8592;</div>
          <div
            class="btn-pag"
            v-for="(tmpPag, idx) in pag"
            :key="idx"
            @click="openPage(idx + 1)"
          >
            {{ idx + 1 }}
          </div>
          <div class="btn btnPrimary" @click="nextPage">&#8594;</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      currentSort: "name",
      currentSortDir: "asc",
      page: {
        current: 1,
        length: 4,
      },
      pag: [],
    };
  },
  computed: {
    usersSort() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.users
        .sort((a, b) => {
          let mod = 1;
          if (this.currentSortDir === "desc") mod = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * mod;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * mod;
          return 0;
        })
        .filter((row, index) => {
          let start = (this.page.current - 1) * this.page.length;
          let end = this.page.current * this.page.length;
          if (index >= start && index < end) return true;
        });
    },
  },
  created() {
    axios
      .get("https://61979af45953f10017d23e63.mockapi.io/User")
      .then((response) => {
        // console.log()
        this.users = response.data;
        this.pag = Math.ceil(this.users.length / this.page.length);
      })
      .catch((error) => {
        console.log(error);
      });

    //  this.users = [
    //    {
    //      id: 1,
    //      name: "Jack",
    //      age: 22,
    //      gender: "male",
    //    },
    //    {
    //      id: 2,
    //      name: " Alex ",
    //      age: 24,
    //      gender: "male",
    //    },
    //  ];
  },
  methods: {
    openPage(idx) {
      this.page.current = idx;
    },
    sort(e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = e;
    },
    prevPage() {
      if (this.page.current > 1) this.page.current -= 1;
    },
    nextPage() {
      if (this.page.current * this.page.length < this.users.length)
        this.page.current += 1;
    },
  },
};
</script>
<style scoped lang="scss">
.button_list {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  text-align: center;
  .btn {
    border-radius: 60px;
    margin: 0 20px;
  }
}

.btn-pag {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #494ce8;
  border-radius: 50%;
  color: #fff;
  margin: 0 2px;
  cursor: pointer;
}
</style>
