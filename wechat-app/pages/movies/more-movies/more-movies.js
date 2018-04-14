import { converToStarsArray,fetchData } from '../../../utils/util.js'
const app = getApp()
Page({
    data: {
        movies: [],
        requestUrl: {},
        totalCount: 0,
        isEmpty: true
    },
    onLoad: function(options) {
        let { category } = options
        let dataUrl = ""

        wx.setNavigationBarTitle({
            title: category
        })
        switch (category) {
            case '正在上映的电影-北京' : 
                dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters'
                break
            case '即将上映的电影' :
                dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon'
                break
            case '豆瓣电影Top250' :
                dataUrl = app.globalData.doubanBase + '/v2/movie/top250'
                break
        }
        this.data.requestUrl = dataUrl
        fetchData(dataUrl,this.processDoubanData)
    },
    processDoubanData: function(data,setKey) {
        let movies = [];
        data.subjects.map((e,i)=>{
            let title = e.title
            if( title.length >=6 ){
                title = title.substring(0,6) + '...'
            }
            var temp = {
                stars: converToStarsArray(e.rating.stars),
                title: title,
                average: e.rating.average,
                coverageUrl: e.images.large,
                movieId: e.id

            }
            movies.push(temp)
        })
        let totalMovies = {
            
        }
        if (!this.data.isEmpty) {
            totalMovies = this.data.movies.concat(movies)
        } else {
            totalMovies = movies
            this.data.isEmpty = false
        }
        this.setData({
            movies: totalMovies
        })
        
        this.data.totalCount+=20
    },
    onScrollLower: function(e) {
        let nextUrl = this.data.requestUrl + "?start=" + this.data.totalCount 
        fetchData(nextUrl,this.processDoubanData)
    },
    onMovieTap: function(e) {
        let movieId = e.currentTarget.dataset.movieid
        wx.navigateTo({
            url: "../movie-detail/movie-detail?movieId=" + movieId
        })
    }
})