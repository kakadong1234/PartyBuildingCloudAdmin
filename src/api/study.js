// import request from '@/utils/request'
let MOCK_HOUSES = [
  {
    ID: 1,
    title: '教学资源01',
    des: '教学资源01很好很好，非常好',
    author: '晓伟01',
    review: { //关联审核
      status: 0,
      currentReviewID: 2,
      reviewList: [
        {
          ID: 1,
          reviewer: '县管理员01',
          result: 'ok'
        },
        {
          ID: 2,
          reviewer: '市管理员01',
        },
      ]
    }
  },
 
  {
    ID: 2,
    title: '教学资源02',
    des: '教学资源02很好很好，非常好',
    author: '晓伟02',
    review: { //关联审核
      status: 1,
      currentReviewID: 4,
      reviewList: [
        {
          ID: 3,
          reviewer: '县管理员02',
          result: 'ok'
        },
        {
          ID: 4,
          reviewer: '市管理员02',
          result: 'ok'
        },
      ]
    }
  },

  {
    ID: 3,
    title: '教学资源03',
    des: '教学资源03很好很好，非常好',
    author: '晓伟03',
    review: { //关联审核
      status: 0,
      currentReviewID: 1,
      reviewList: [
        {
          ID: 1,
          reviewer: '县管理员01',
          result: '态度不忍直视'
        },
      ]
    }
  },
]

export function getStudyList() {
  console.log('getStudyList request')
  // return request({
  //   url: '/houses',
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {
      data: {}
    }
    data.data.lists = MOCK_HOUSES
    reslove(data)
  })
}

export function createStudy(study) {
  console.log('create request')
  // return request({
  //   url: '/houses',
  //   method: 'post',
  //   data: house
  // })
  return new Promise(function(reslove, reject) {
    study.ID = 11
    study.author = '晓伟04'
    study.review = {}
    study.review.status = 0
    MOCK_HOUSES.push(study)
    reslove()
  })
}

export function getStudy(ID) {
  console.log('getStudy request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {}
    data.data = MOCK_HOUSES.find(function(study) {
      return study.ID === parseInt(ID)
    })
    reslove(data)
  })
}

export function editStudy(newStudy) {
  console.log('editStudy request')
  // return request({
  //   url: '/houses/' + newHouse.ID,
  //   method: 'post',
  //   data: newHouse
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.map(function(study) {
      if (study.ID === parseInt(newStudy.ID)) {
        return newStudy
      }
      return study
    })
    reslove()
  })
}

export function deleteStudy(ID) {
  console.log('deleteStudy request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'delete'
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.filter(function(study) {
      return study.ID !== parseInt(ID)
    })
    reslove()
  })
}
