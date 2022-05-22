import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeComposer: '',
    activeModal: '',
    activePage: '',
    activePageContent: '',
    activeNewsArticle: '',
    activeProgram: '',
    composers: {
      Tchaikovsky: {
        name: 'Tchaikovsky',
        video: 'https://player.vimeo.com/video/569005125'
      },
      Beethoven: {
        name: 'Beethoven',
        video: 'https://player.vimeo.com/video/569005582'
      },
      Bernstein: {
        name: 'Bernstein',
        video: 'https://player.vimeo.com/video/569000563'
      },
      Gershwin: {
        name: 'Gershwin',
        video: 'https://player.vimeo.com/video/569006391'
      },
      Joplin: {
        name: 'Joplin',
        video: 'https://player.vimeo.com/video/569006259'
      },
      Mozart: {
        name: 'Mozart',
        video: 'https://player.vimeo.com/video/569004022'
      },
      Chopin: {
        name: 'Chopin',
        video: 'https://player.vimeo.com/video/569004614'
      },
      Schumann: {
        name: 'Schumann',
        video: 'https://player.vimeo.com/video/569005822'
      },
      Rachmaninoff: {
        name: 'Rachmaninoff',
        video: 'https://player.vimeo.com/video/569006167'
      }
    },
    headlineSrc: '/images/headline.png',
    mobileNavActive: false,
    videoNavActive: false,
    openingModal: false,
    videoActive: false
  },
  mutations: {
    updateActiveComposer (state, payload) {
      state.activeComposer = payload
   },
   updateActiveLayout (state, payload) {
      state.activeLayout = payload
   },
   updateHeadlineSrc (state, payload) {
      state.headlineSrc = payload
   },
   updateActiveModal (state, payload) {
      state.activeModal = payload
   },
   updateVideoActive (state, payload) {
      state.videoActive = payload
   },
   updateActivePage (state, payload) {
      state.activePage = payload
   },
   updateActivePageContent (state, payload) {
      state.activePageContent = payload
   },
   updateActiveNewsArticle (state, payload) {
      state.activeNewsArticle = payload
   },
   updateActiveProgram (state, payload) {
      state.activeProgram = payload
   },
   updateOpeningModal (state, payload) {
      state.openingModal = payload
   },
   updateMobileNavActive (state, payload) {
      state.mobileNavActive = payload
   },
   updateVideoNavActive (state, payload) {
      state.videoNavActive = payload
   }
  },
  actions: {
    updateActiveComposer ({state, getters, commit}, payload) {
      commit('updateActiveComposer', payload)
    },
    updateActiveLayout ({state, getters, commit}, payload) {
      commit('updateActiveLayout', payload)
    },
    updateHeadlineSrc ({state, getters, commit}, payload) {
      commit('updateHeadlineSrc', payload)
    },
    updateActiveModal ({state, getters, commit}, payload) {
      commit('updateActiveModal', payload)
    },
    updateVideoActive ({state, getters, commit}, payload) {
      commit('updateVideoActive', payload)
    },
    updateActivePage ({state, getters, commit}, payload) {
      commit('updateActivePage', payload)
    },
    updateActivePageContent ({state, getters, commit}, payload) {
      commit('updateActivePageContent', payload)
    },
    updateActiveNewsArticle ({state, getters, commit}, payload) {
      commit('updateActiveNewsArticle', payload)
    },
    updateActiveProgram ({state, getters, commit}, payload) {
      commit('updateActiveProgram', payload)
    },
    updateOpeningModal ({state, getters, commit}, payload) {
      commit('updateOpeningModal', payload)
    },
    updateMobileNavActive ({state, getters, commit}, payload) {
      commit('updateMobileNavActive', payload)
    },
    updateVideoNavActive ({state, getters, commit}, payload) {
      commit('updateVideoNavActive', payload)
    }
  },
  modules: {
  }
})
