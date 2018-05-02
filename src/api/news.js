import request from '@/utils/request'
// let MOCK_HOUSES = [
//   {
//     ID: 1,
//     title: '新闻01',
//     des: '新闻01很好很好，非常好',
//     author: '晓伟01',
//     isPublic: false, //是否对外可见 (true 表示在首页-新闻动态中可见)
//     isGood: false, //是否是好文章,( true 表示在首页-他山之玉中可见)
//     partyBranch: { //关联党支部
//       ID: 1,
//       title: '党支部01'
//     },
//     review: { //关联审核
//       status: 0,
//       currentReviewID: 2,
//       reviewList: [
//         {
//           ID: 1,
//           reviewer: '县管理员01',
//           result: 'ok'
//         },
//         {
//           ID: 2,
//           reviewer: '市管理员01',
//         },
//       ]
//     }
//   },
 
//   {
//     ID: 2,
//     title: '新闻02',
//     des: '新闻02很好很好，非常好',
//     author: '晓伟02',
//     isPublic: true, //是否对外可见 (true 表示在首页-新闻动态中可见)
//     isGood: true, //是否是好文章,( true 表示在首页-他山之玉中可见)
//     partyBranch: { //关联党支部
//       ID: 2,
//       title: '党支部02'
//     },
//     review: { //关联审核
//       status: 1,
//       currentReviewID: 4,
//       reviewList: [
//         {
//           ID: 3,
//           reviewer: '县管理员02',
//           result: 'ok'
//         },
//         {
//           ID: 4,
//           reviewer: '市管理员02',
//           result: 'ok'
//         },
//       ]
//     }
//   },

//   {
//     ID: 3,
//     title: '新闻03',
//     des: '新闻03很好很好，非常好',
//     author: '晓伟03',
//     isPublic: false, //是否对外可见 (true 表示在首页-新闻动态中可见)
//     isGood: false, //是否是好文章,( true 表示在首页-他山之玉中可见)
//     partyBranch: { //关联党支部
//       ID: 3,
//       title: '党支部03'
//     },
//     review: { //关联审核
//       status: 0,
//       currentReviewID: 1,
//       reviewList: [
//         {
//           ID: 1,
//           reviewer: '县管理员01',
//           result: '态度不忍直视'
//         },
//       ]
//     }
//   },
// ]

export function getNewsList() {
  console.log('getNewsList request')
  return request({
    url: '/news',
    method: 'get'
  })
}

export function createNews(news) {
  console.log('create request')
  return request({
    url: 'news',
    method: 'post',
    data: news
  })
}

export function getNews(ID) {
  console.log('getNews request')
  return request({
    url: '/news/' + ID,
    method: 'get'
  })
}

export function editNews(newNews) {
  console.log('editNews request')
  const id = newNews.id
  return request({
    url: '/news/' + id,
    method: 'post',
    data: newNews
  })
}

export function deleteNews(ID) {
  console.log('deleteNews request')
  return request({
    url: '/news/' + ID,
    method: 'delete'
  })
}
