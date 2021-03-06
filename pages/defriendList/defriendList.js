// miniprogram/pages/mine/defriendList/defriendList.js
const app = getApp();
const db = wx.cloud.database();
const _dbc = 'defriend';
Page({
  data: {
    statusBarHeight: getApp().globalData.statusBarHeight,
    listData: null
  },
  unDefriend(e) {
    let _that = this;
    let _openid = e.currentTarget.dataset.openid
    db.collection(_dbc).where({
      defriendOpenid: _openid
    }).get().then(res => {
      let _defriendInfo = res.data[0];
      if (res.data.length > 0) {
        wx.cloud.callFunction({
          name: 'undefriend',
          data: {
            _id: _defriendInfo._id
          }
        }).then(res => {
          wx.cloud.callFunction({
            name: 'updateuser',
            data: {
              _id: _defriendInfo.defriendId,
              _obj: {
                auth: 0
              }
            }
          }).then(res => {
            wx.showToast({
              title: '操作成功'
            })
            _that.getDefriendList();
          })
          wx.showToast({
            title: '操作成功'
          })
        })
      }
    })
  },
  getDefriendList() {
    db.collection(_dbc).orderBy('createTime', 'desc').get().then(res => {
      this.setData({
        listData: res.data
      })
    })
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getDefriendList();
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  goback(){
    wx.navigateBack({
      
    })
  }
})