<template>
  <nav class="navbar">
    <div class="icon" @click="shownav">
      <font-awesome-icon icon="fa-solid fa-bars fa-lg" />
    </div>
    <div class="header">
      <h2>News Time</h2>
    </div>
    <div class="search">
      <!-- <input type="text" v-model="searchQuery" placeholder="Search news..." /> -->
      <!-- <input type="text" name="search" id=""> -->
      <input
        type="text"
        v-model="searchQuery"
        class="searchBar"
        placeholder="Search . . ."
      />
      <button @click="search" class="search-btn">
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {

    };
  },
  methods: {
    shownav() {
      this.$store.commit("increment");
      console.log(this.$store.state.status);
    },
  },
};
</script>

<style scoped>
.navbar {
  background-color: #1976d2;
  color: aliceblue;
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
}
.searchBar {
  border-radius: 50px;
  border: none;
  height: 25px;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  /* background-color: red; */
}
.search-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: aliceblue;
}
/* responsive navbar */
@media only screen and (max-width: 500px) {
  .navbar {
    background-color: #1976d2;
  }
  .header {
    display: none;
    height: 100%;
  }
  .search {
    display: flex;
    padding-left: 50px;
    padding-top: 20px;
    padding-bottom: 20px;
  }
}
</style>
