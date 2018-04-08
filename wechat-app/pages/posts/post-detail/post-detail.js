import postData from '../../../data/post'
Page({
    onLoad: function(option) {
        let { postId } = option
        this.data.currentPostId = postId
        let data = postData[postId]

        this.setData({
            data: data
        })
        var postsCollected = wx.getStorageSync('posts_Collected')
        if( postsCollected ) {
            var postCollected = postsCollected[postId]
            this.setData({
                collected: postCollected
            })
        }
        else{
            var postsCollected = {}
            postsCollected[postId] = false
            wx.setStorageSync('posts_Collected',postsCollected)
        } 
    },
    onCollectionTap: function(e){
       //获取 wx.getStorage()
       //赋值 wx.setStorage()
       //删除 wx.removeStorage()
       //清除 wx.clearStorage()
       var postsCollected = wx.getStorageSync('posts_Collected')
       var postCollected = postsCollected[this.data.currentPostId]
       postCollected = !postCollected
       postsCollected[this.data.currentPostId] = postCollected
       wx.setStorageSync('posts_Collected',postsCollected)
       this.setData({
            collected:postCollected
        })
        wx.showModal({
            title: '收藏',
            content: '是否收藏该文章',
            showCancel: "true",
            cancelText: "不收藏",
            cancelColor: "#333",
            confirmText: "收藏",
            confirmColor: "#405f80"
        })
        
       
    },
    onShareTap: e=>{
        var itemList = ["分享给微信好友","分享到朋友圈","分享给QQ好友","分享到微博"]
       wx.showActionSheet({
           itemList: itemList,
           itemColor: "#405f80",
           success: res=>{
               wx.showModal({
                   title: "用户分享到了"+ itemList[res.tapIndex],
                   content: "分享啦"
               })
           }
       })
    }
})