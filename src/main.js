import { createApp } from 'vue'
import { createStore } from "vuex"; 
import './style.css'
import App from './App.vue'
// import axios from 'axios'

// adding icons
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faMagnifyingGlass, faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

// vue use
// Vue.use(axios)
/* add icons to the library */
library.add(faUserSecret, faBars, faTwitter, faMagnifyingGlass);

const store = createStore({
  state() {
    return {
      status: false,
    };
  },
  mutations: {
    increment() {
     if(this.state.status === false){
        this.state.status = true  
     }
     else if(this.state.status === true){
        this.state.status === false;
     }
    },
  },
});

createApp(App).use(store).component("font-awesome-icon", FontAwesomeIcon).mount("#app");
