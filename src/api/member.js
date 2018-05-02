import request from '@/utils/request'
let MOCK_HOUSES = [
  {
    ID: 1,
    name: 'xiaowei01',
    phone: '15372383031',
    type: '市直部门党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    partyBranch: { //关联党支部
      ID: 1,
      title: '党支部01'
    }
  },
 
  {
    ID: 2,
    name: 'xiaowei02',
    phone: '15372383031',
    type: '乡镇机关党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    partyBranch: { //关联党支部
      ID: 2,
      title: '党支部02'
    }
  },
 
  {
    ID: 3,
    name: 'xiaowei03',
    phone: '15372383031',
    type: '乡企业党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    partyBranch: { //关联党支部
      ID: 3,
      title: '党支部02'
    }
  },

  {
    ID: 4,
    name: 'xiaowei03',
    phone: '15372383031',
    type: '退休党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    partyBranch: { //关联党支部
      ID: 4,
      title: '党支部04'
    }
  },

  {
    ID: 5,
    name: 'xiaowei03',
    phone: '15372383031',
    type: '农村党员', //学习时长设置的时候要用 有-> 市直部门党员、乡镇机关党员、企业党员、退休党员、农村党员
    partyBranch: { //关联党支部
      ID: 5,
      title: '党支部05'
    }
  },
]

export function getSignOnList() {
  console.log('getSignOnList request')
  return request({
    url: '/listRecord/22123959',
    method: 'get'
  })
}

export function getMemberList() {
  console.log('getMemberList request')
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

export function createMember(member) {
  console.log('create request')
  // return request({
  //   url: '/houses',
  //   method: 'post',
  //   data: house
  // })
  return new Promise(function(reslove, reject) {
    member.ID = 11
    MOCK_HOUSES.push(member)
    reslove()
  })
}

export function getMember(ID) {
  console.log('getMember request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {}
    data.data = MOCK_HOUSES.find(function(memeber) {
      return memeber.ID === parseInt(ID)
    })
    reslove(data)
  })
}

export function editMember(newMember) {
  console.log('editMember request')
  // return request({
  //   url: '/houses/' + newHouse.ID,
  //   method: 'post',
  //   data: newHouse
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.map(function(member) {
      if (member.ID === parseInt(newMember.ID)) {
        return newMember
      }
      return member
    })
    reslove()
  })
}

export function deleteMember(ID) {
  console.log('deleteMember request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'delete'
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.filter(function(member) {
      return member.ID !== parseInt(ID)
    })
    reslove()
  })
}
