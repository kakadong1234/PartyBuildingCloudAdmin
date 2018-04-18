// import { getHouses, getHouse, createHouse, editHouse, deleteHouse } from '@/api/houses'
// // import { getToken, setToken, removeToken } from '@/utils/auth'

// const user = {
//   state: {
//     houses: [],
//     currentHouse: {}
//   },

//   mutations: {
//     SET_HOUSES: (state, houses) => {
//       state.houses = houses
//     },
//     SET_CURRENT_HOUSE: (state, house) => {
//       state.currentHouse = house
//     }
//   },

//   actions: {
//     // 获取 houses
//     getHouses({ commit }) {
//       return new Promise((resolve, reject) => {
//         getHouses().then(response => {
//           const data = response.data
//           commit('SET_HOUSES', data.data)
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 获取某个house信息
//     getHouse({ commit, ID }) {
//       return new Promise((resolve, reject) => {
//         getHouse(ID).then(response => {
//           const data = response.data
//           commit('SET_CURRENT_HOUSE', data.data)
//           resolve(response)
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 创建房子
//     createHouse({ commit, house }) {
//       return new Promise((resolve, reject) => {
//         createHouse(house).then(() => {
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 编辑房子
//     editHouse({ commit, newHouses }) {
//       return new Promise((resolve, reject) => {
//         editHouse(newHouses).then(() => {
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//     // 创建房子
//     deleteHouse({ commit, ID }) {
//       return new Promise((resolve, reject) => {
//         deleteHouse(ID).then(() => {
//           resolve()
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     }
//   }
// }

// export default user
