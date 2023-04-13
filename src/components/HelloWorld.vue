<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      searchQuery: "",
      articles: [],
      isSidebarOpen: false,
    };
  },

  methods: {

    toggleSidebar() {
      console.log("coll");
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    toggleExpansion(article) {
      if (this.isExpanded(article)) {
        this.expandedArticles = this.expandedArticles.filter(
          (id) => id !== article.id
        );
      } else {
        this.expandedArticles.push(article.id);
      }
    },
    cut(x) {
      var y = x.slice(0, 10);
      return `${y}...`;
    },
    cut2(x) {
      var y = x.slice(0, 40);
      return `${y}...`;
    },
  },

  mounted() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=910cfdf3231943dabda80a14c1519427"
      )
      .then((response) => {
        this.articles = response.data.articles;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {

    filteredArticles() {
      console.log(this.searchQuery);
      if (!this.searchQuery) {
        return this.articles;
      } else {
        return this.articles.filter((article) =>
          article.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    // filterred sources to avoid repeating sources
    filteredSources(){
      const uniqueSources = [...new Set(this.articles.map(item => item.source.name))];
      return uniqueSources.map(name => this.articles.find(item => item.source.name === name));

    },
    sidebarClass() {
      return {
        "sidebar-container": this.isSidebarOpen,
        "sidebar-container-close": !this.isSidebarOpen,
      };
    },
  },
};
</script>
<!-- template -->
<template>
  <!-- <div>
    <button @click="toggleSidebar">Toggle Sidebar</button>
    <div :class="sidebarClass">
      <h2>Sidebar Content</h2>
    </div>
    <div>Main Content</div>
  </div> -->

  <!-- sidebar -->
  <div :class="sidebarClass">
    <div class="sidebar-container">
      <div class="logo-container">
        <div class="logo">Source</div>
        <div class="icon">
          <font-awesome-icon
            icon="fa-solid fa-xmark"
            size="2xl"
            @click="toggleSidebar"
          />
        </div>
      </div>

      <div class="menu-items">
        <ul class="list-items" v-for="item in filteredSources" :key="item.id">
          <li>{{ item.source.name }}</li>
         
        </ul>
      </div>
    </div>
  </div>
  <!-- topnavbar -->
  <div class="top-navbar">
    <nav class="navbar">
      <div class="icon" @click="toggleSidebar">
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

    <div class="card-container">
      <div class="card" v-for="article in filteredArticles" :key="article.id">
        <img
          :src="
            article.urlToImage
              ? article.urlToImage
              : 'data:image/png;base64,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'
          "
          class="image"
          alt="Image loading"
        />

        <div class="card-title">
          {{ cut2(article.title) }}
        </div>

        <div class="card-subtitle">
          <p class="news-description">
            {{ article.description }}
          </p>
        </div>

        <div class="card-btns">
          <a v-if="article.url" :href="article.url" target="_blank">
            <button class="src_btn">{{ article.source.name }}</button>
          </a>
          <button class="tw_btn">
            <font-awesome-icon icon="fa-brands fa-twitter" /> twitter
          </button>

          <button @click="toggleExpansion(article)" class="rd_btn">
            Read More
          </button>
        </div>
      </div>
    </div>
  </div>

  <h3 class="text">{{ searchQuery }}</h3>
</template>

<!-- styling -->
<style>
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
.icon{
  cursor: pointer;
}
/* sidebar */

.sidebar-container-close {
  display: none;
  transition: all 50s ease-out;

}
.sidebar-container {
  background-color: #1976d2;
  position: absolute;
  height: 100%;
  width: 300px;
  color: aliceblue;
  z-index: 1;
  left: 0;
  top: 0;
  transition: all 50s ease-out;
}
.logo-container {
  display: grid;
  grid-template-columns: 5fr 1fr;
  padding-top: 20px;
  cursor: pointer;
}
.logo {
  font-size: xx-large;
  font-family: times;
  font-weight: bolder;
  margin-left: 10px;
}
.list-itemS{
  font-weight: bolder;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: red;
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
.card-container {
  /* margin-left: 10px; */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  justify-content: space-around;
}
.card {
  background-color: #fff;
  max-width: 15vw;
  min-width: 15vw;
  border-radius: 20px 20px 20px 20px;
  /* padding-bottom: 10px; */
  margin: 10px;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 10rem 2rem auto auto;
  justify-content: space-between;
}
.card-subtitle {
  padding: 0 5px;
  /* width: 90px; */
}
.card img {
  object-fit: fill;
  aspect-ratio: 16/9;
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 0px 0px;
  /* width: max-content; */
  transform-origin: center;
  transform: scale(var(--img-scale));
  transition: transform 0.4s ease-in-out;
}

.card-btns {
  position: relative;
  display: flex;
  height: auto;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 2;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.card-title {
  padding: 0;
  margin: 0;
  text-decoration: underline;
  font-size: large;
  font-weight: bold;
  padding-inline: 5px;
  min-height: 50px;
  display: grid;
  justify-content: center;
  align-items: center;
}
/* */
body {
  margin: 0;
  background-color: #b5b682;
}
.src_btn {
  background-color: black;
  color: white;
  border-radius: 20px;
  width: auto;
  cursor: pointer;
  border: none;
  overflow: hidden;
  padding: 2px 10px;
  flex-grow: 2;
}
.tw_btn {
  background-color: #1da1f2;
  color: white;
  border-radius: 20px;
  width: auto;
  cursor: pointer;
  border: none;
  display: grid;
  grid-template-columns: 0.2fr auto;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
}
.rd_btn {
  background-color: #1976d2;
  color: white;
  border-radius: 20px;
  width: auto;
  cursor: pointer;

  border: none;
}
/* responsive  */
@media only screen and (max-width: 900px) {
  .card-container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 580px) {
  .card-container {
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
  }
  .card {
    max-width: 45vw;
    min-width: 45vw;
    grid-template-rows: 10rem 3rem auto auto;
  }
}
</style>
