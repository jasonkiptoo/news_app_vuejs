<template>
  <!-- sidebar -->
  <div class="sidebar">
    <div class="container">
      <div class="logo-container">
        <div class="logo">News app</div>
        <div class="icon">
          <font-awesome-icon icon="fa-solid fa-xmark" size="2xl" />
        </div>
      </div>

      <div class="menu-items">
        <ul class="list-items">
          <li>item 1</li>
          <li>item 2</li>
          <li>item 3</li>
        </ul>
      </div>
    </div>
  </div>
  <!-- topnavbar -->
  <div class="top-navbar">
    <nav class="navbar">
      <div class="icon" @click="showSidebar()">
        <font-awesome-icon icon="fa-solid fa-bars" size="2xl" />
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
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    // return {
    //   active: true
    // };
  },
  // mounted(){
    // this.$parent.$on('showNav', ()=>{
    //   this.active =!this.active
    // })

  // },
  methods: {
   showSidebar(){
    this.$parent.$emit("showNav")

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
/* sidebar */

.container {
  background-color: #1976d2;
  position: absolute;
  height: 100%;
  width: 300px;
  color: aliceblue;
  z-index: 1;
  display: none;
  /* display: grid;
grid-template-columns: 4fr 1fr; */
}
.logo-container {
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding-top: 20px;
  cursor: pointer;
}
.logo {
  font-size: xx-large;
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
.list-items {
  list-style: none;
  cursor: pointer;
}
</style>
