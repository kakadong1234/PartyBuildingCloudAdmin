// import request from '@/utils/request'
let MOCK_HOUSES = [
  {
    ID: 1,
    type: '市直部门党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    studyTime: '50'
  },
 
  {
    ID: 2,
    type: '乡镇机关党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    studyTime: '40'
  },
 
  {
    ID: 3,
    type: '乡企业党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    studyTime: '20'
  },

  {
    ID: 4,
    type: '退休党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    studyTime: '20'
  },

  {
    ID: 5,
    type: '农村党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    studyTime: '0'
  },
]

export function getStudyTimeList() {
  console.log('getStudyTimeList request')
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


export function getStudyTime(ID) {
  console.log('getStudyTime request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {}
    data.data = MOCK_HOUSES.find(function(studyTime) {
      return studyTime.ID === parseInt(ID)
    })
    reslove(data)
  })
}

export function editStudyTime(newStudyTime) {
  console.log('editStudyTime request')
  // return request({
  //   url: '/houses/' + newHouse.ID,
  //   method: 'post',
  //   data: newHouse
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.map(function(studyTime) {
      if (studyTime.ID === parseInt(newStudyTime.ID)) {
        return newStudyTime
      }
      return studyTime
    })
    reslove()
  })
}


