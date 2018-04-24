// import request from '@/utils/request'
let MOCK_HOUSES = [
  {
    ID: 1,
    type: '01',
    title: '党支部01',
    des: '房子01很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 2,
    type: '02',
    title: '党支部02',
    des: '房子02很好很好，非常好',
    address: '上海市金山区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png'
  },
  {
    ID: 3,
    type: '02',
    title: '党支部03',
    des: '党支部03很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 4,
    type: '02',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 5,
    type: '01',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 6,
    type: '01',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 7,
    type: '02',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 8,
    type: '02',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 9,
    type: '03',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 10,
    type: '03',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    location: [],
    qrcodeUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  }
]

export function getPartyBranchList() {
  console.log('getPartyBranch request')
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

export function createPartyBranch(branch) {
  console.log('create request')
  // return request({
  //   url: '/houses',
  //   method: 'post',
  //   data: house
  // })
  return new Promise(function(reslove, reject) {
    branch.ID = 11
    MOCK_HOUSES.push(branch)
    reslove()
  })
}

export function getPartyBranch(ID) {
  console.log('PartyBranch request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {}
    data.data = MOCK_HOUSES.find(function(branch) {
      return branch.ID === parseInt(ID)
    })
    reslove(data)
  })
}

export function editPartyBranch(newBranch) {
  console.log('editPartyBranch request')
  // return request({
  //   url: '/houses/' + newHouse.ID,
  //   method: 'post',
  //   data: newHouse
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.map(function(branch) {
      if (branch.ID === parseInt(newBranch.ID)) {
        return newBranch
      }
      return branch
    })
    reslove()
  })
}

export function deletePartyBranch(ID) {
  console.log('deletePartyBranch request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'delete'
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.filter(function(brnach) {
      return branch.ID !== parseInt(ID)
    })
    reslove()
  })
}
