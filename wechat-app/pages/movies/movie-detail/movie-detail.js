import { converToStarsArray,converToCastString,converToCastInfos,fetchData } from '../../../utils/util.js'
const app = getApp()
Page({
    onLoad: function(options) {
        let movieId = options.movieId
        let dataUrl = app.globalData.doubanBase + '/v2/movie/subject/' + movieId
        fetchData(dataUrl,this.processDoubanData)

    },
    processDoubanData: function(data) {
        var director = {
            avatar: "",
            name: "",
            id: ""
        }
        if(data.directors[0] != null) {
            if(data.directors[0].avatars != null) {
                director.avatar = data.directors[0].avatars.large
            }
            director.name = data.directors[0].name
            director.id = data.directors[0].id
        }
        let movie = {
            movieImg: data.images ? data.images.large : "",
            country: data.countries[0],
            title: data.title,
            originalTitle: data.original_title,
            wishCount: data.wish_count,
            commentCount: data.comments_count,
            year: data.year,
            generes: data.genres.join("、"),
            stars: converToStarsArray(data.rating.stars),
            score: data.rating.average,
            director: director,
            casts: converToCastString(data.casts),
            castsInfo: converToCastInfos(data.casts),
            summary: data.summary
        }
        this.setData({
            movie:movie
        })
    },
    viewMoviePostImg: function(e) {
        let src = e.currentTarget.dataset.src
        wx.previewImage({
            current: src,
            urls: [src]
        })
    }
})