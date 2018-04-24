// import request from '@/utils/request'
let MOCK_HOUSES = [
  {
    ID: 1,
    resourceType: 'V01',
    title: '党支部01',
    des: '房子01很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 2,
    resourceType: 'V02',
    title: '党支部02',
    des: '房子02很好很好，非常好',
    address: '上海市金山区金沙江路 1518 弄',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/280px-PNG_transparency_demonstration_1.png'
  },
  {
    ID: 3,
    resourceType: 'V03',
    title: '党支部03',
    des: '党支部03很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 4,
    resourceType: 'V03',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 5,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 6,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 7,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 8,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 9,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  },
  {
    ID: 10,
    resourceType: 'V4',
    title: '党支部04',
    des: '房子04很好很好，非常好',
    address: '上海市普陀区金沙江路 1518 弄',
    thumbnailUrl: 'http://pic.ibaotu.com/00/55/70/856888piCpwt.jpg-0.jpg!ww700'
  }
]

export function getPartyBranch() {
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
    house.ID = 11
    MOCK_HOUSES.push(branch)
    reslove()
  })
}

export function getHouse(ID) {
  console.log('getHouse request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'get'
  // })
  return new Promise(function(reslove, reject) {
    const data = {}
    data.data = MOCK_HOUSES.find(function(house) {
      return house.ID === parseInt(ID)
    })
    data.data.imgUrlList = ['http://orw37xxpx.bkt.clouddn.com/prod/usersystem/1521503875135.png', 'http://orw37xxpx.bkt.clouddn.com/prod/usersystem/1521503875135.png']
    reslove(data)
  })
}

export function editHouse(newHouse) {
  console.log('editHouse request')
  // return request({
  //   url: '/houses/' + newHouse.ID,
  //   method: 'post',
  //   data: newHouse
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.map(function(house) {
      if (house.ID === parseInt(newHouse.ID)) {
        return newHouse
      }
      return house
    })
    reslove()
  })
}

export function deleteHouse(ID) {
  console.log('deleteHouse request')
  // return request({
  //   url: '/houses/' + ID,
  //   method: 'delete'
  // })
  return new Promise(function(reslove, reject) {
    MOCK_HOUSES = MOCK_HOUSES.filter(function(house) {
      return house.ID !== parseInt(ID)
    })
    reslove()
  })
}
