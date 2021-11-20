<template>
  <div class="container">
    <div class="home">
      <h1>Users</h1>
      <table>
        <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('age')">Age</th>
          <th @click="sort('gender')">Gender</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in usersSort" :key="user.id">
          <td >{{ user.name }}</td>
          <td >{{ user.age }}</td>
          <td >{{ user.gender }}</td>
        </tr>
        </tbody>
      </table>
      <p>debuge: sort: {{ currentSort }}, dir: {{ currentSortDir }}</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc'
    }
  },
  computed: {
    usersSort () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.users.sort((a, b) => {
        let mod = 1
        if (this.currentSortDir === 'desc') mod = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * mod
        if (a[this.currentSort] > b[this.currentSort]) return 1 * mod
        return 0
      })
    }

  },
  created () {
    axios
      .get('https://61979af45953f10017d23e63.mockapi.io/User')
      .then(response => {
        // console.log()
        this.users = response.data
      })
      .catch(error => {
        console.log(error)
      })
    this.users = [
      {
        id: 1,
        name: 'Jack',
        age: 22,
        gender: 'male'
      },
      {
        id: 2,
        name: ' Alex ',
        age: 24,
        gender: 'male'
      }
    ]
  },
  methods: {
    sort (e) {
      if (e === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = e
    }
  }
}
</script>
