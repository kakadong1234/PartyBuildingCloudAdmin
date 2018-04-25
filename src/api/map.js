export function getLocation(address) {
    console.log('getLocation')
    return new Promise(function(reslove, reject) {
        AMap.service('AMap.Geocoder',function(){
            new AMap.Geocoder({}).getLocation(address, function(status, result) {
              console.log('-----------status:' + status)
              if (status === 'complete' && result.info === 'OK') {
                const location = result.geocodes[0].location
                console.log(location)
                return reslove([location.lng, location.lat])
              }
              else {
                 return reject(new Error('获取经纬度失败, 错误为' + result.info))
              }
            })
        })
    })
}
  
  export function createHouse(house) {
    console.log('create request')
    // return request({
    //   url: '/houses',
    //   method: 'post',
    //   data: house
    // })
    return new Promise(function(reslove, reject) {
      house.ID = 11
      MOCK_HOUSES.push(house)
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
  