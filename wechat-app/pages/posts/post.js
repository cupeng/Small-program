import postData from '../../data/post.js'
Page({
    data: {},
    onLoad: function() {
        //页面初始化
        this.setData({
            data:postData
        })
    },
    onReady: function() {
        //页面渲染完成

    },
    onShow: function() {
        //页面显示
    },
    onHide: function() {
        //页面隐藏
    },
    onUnload: function() {
        //页面关闭
    },
    onPostTap: function(e) {
        var postId = e.currentTarget.dataset.id
        wx.navigateTo({
            url:"post-detail/post-detail?postId=" + postId
        })
    }
})