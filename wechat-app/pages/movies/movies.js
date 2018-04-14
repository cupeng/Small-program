import { converToStarsArray } from '../../utils/util.js'
const app = getApp()

Page({
    // RESTFul API 
    data: {
        inTheaters: [],
        comingSoon: [],
        top250: [],
        containerShow: true,
        searchPanelShow: false,
        searchResult: {}
    },
    onLoad: function(e) {
        let inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?count=3'
        let comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?count=3'
        let top250Url = app.globalData.doubanBase + '/v2/movie/top250?count=3'
        
        this.fetchData(inTheatersUrl,"inTheaters")
        this.fetchData(comingSoonUrl,"comingSoon")
        this.fetchData(top250Url,"top250")

        
    },
    fetchData: function(url,setKey) {
        wx.request({
            url:url,
            method: 'GET',
            header:{
                "Content-Type":"json"
            },
            success: res=>{
                this.processDoubanData(res.data,setKey,res.data.title)
            }
        })
    },
    processDoubanData: function(data,setKey,categoryTitle) {
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
        var readyData = {}
        readyData[setKey] = {
            categoryTitle: categoryTitle,
            movies: movies
        }
        this.setData(readyData)
    },
    onMoreTap: function(e) {
        let { category } = e.currentTarget.dataset
        wx.navigateTo({
            url:"./more-movies/more-movies?category=" + category
        })
    },
    onCanceImgTap: function(e) {
        this.setData({
            containerShow: true,
            searchPanelShow: false
        })
    },
    onBindFocus: function() {
       this.setData({
           containerShow: false,
           searchPanelShow: true
       })
    },
    onBindChange: function(e) {
        let val = e.detail.value
        let searchUrl = app.globalData.doubanBase + "/v2/movie/search?q=" + val
        this.fetchData(searchUrl,"searchResult","")
    },
    onMovieTap: function(e) {
        let movieId = e.currentTarget.dataset.movieid
        wx.navigateTo({
            url: "movie-detail/movie-detail?movieId=" + movieId
        })
    }
})