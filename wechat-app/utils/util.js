
export function converToStarsArray(stars) {
    var num = stars.toString().substring(0,1)
    var array = []
    for(var i=1; i<=5; i++) {
        if( i<= num ) {
            array.push(1)
        } else {
            array.push(0)
        }
    }
    return array
}

export function fetchData(url,callback) {
    wx.request({
        url:url,
        method: 'GET',
        header:{
            "Content-Type":"json"
        },
        success: res=>{
            callback(res.data)
        }
    })
}

export function converToCastString(casts) {
    var castsjoin = ''
    for(var idx in casts) {
        castsjoin = castsjoin + casts[idx].name + '/' 
    }
    return castsjoin.substring(0,castsjoin.length-2)
}

export function converToCastInfos(casts) {
    let castsArray = []
    for(var idx in casts) {
        let cast = {
            img: casts[idx].avatars ? casts[idx].avatars.large : "",
            name: casts[idx].name
        }
        castsArray.push(cast)
    }
    return castsArray
}
