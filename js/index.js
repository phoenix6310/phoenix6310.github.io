$(function () {
 var wrapMenu = $('.menu-wrap')
 var menuIndex = 0
 var subMenuIndex = 0
 var contentWrap = $('#qinghai-content')
 var subMenuWrap = $('.sub-menu-wrap')
 // 有详情页的图片
 var canClickImgList = ['21', '22', '23', '25']
 wrapMenu.on('click', '.menu-item', function () {
  if (!$(this).hasClass('menu-active-item')) {
   $(this).parent().children().each(function (index, item) {
    $(item).removeClass('menu-active-item')
   })
   $(this).toggleClass('menu-active-item')
  }
  if ($(this).index() !== menuIndex) {
   menuIndex = $(this).index()
   loadPng('0' + (menuIndex + 1) + '01', menuIndex)
   showSubMenu(menuIndex)
  }
 })

 var contentConfig = {
  '0101': './imgs/01-01.jpg',
  '0201': './imgs/02-01.jpg',
  '0202': './imgs/02-02.jpg',
  '0301': './imgs/03-01.jpg',
  '0302': './imgs/03-02.jpg',
  '0303': './imgs/03-03.jpg',
  '0304': './imgs/03-04.jpg',
  '0306': './imgs/03-06.jpg',
  '0401': './imgs/04-01.jpg',
  '0402': './imgs/04-02.jpg',
 }

 function loadPng(index, menuIndex) {
  var contentImg = contentWrap.find('img')

  contentImg.attr('src', contentConfig[index])
  contentWrap.empty()
  contentWrap.append(contentImg)
  // 子菜单切换为第一个菜单为选中
  var subParentEl = $('.sub-menu-' + menuIndex)
  if (menuIndex > 0) {
   subMenuIndex = 0
   subParentEl.find('.sub-active-item').removeClass('sub-active-item')
   subParentEl.find('.sub-menu-item:eq(0)').addClass('sub-active-item')
  }
 }

 showSubMenu(menuIndex)
 function showSubMenu(index) {
  // 隐藏所有子菜单
  subMenuWrap.hide()
  subMenuWrap.find('.sub-menu').each(function (index, item) {
   $(item).hide()
  })
  if (index > 0) {
   subMenuWrap.show()
   subMenuWrap.find('.sub-menu-' + index).show()
  }
 }
 function changeActiveClass(context) {
  if ($(context).data('active') === false) {
   return;
  }
  // 颜色切换
  if (!$(context).hasClass('menu-active-item')) {
   $(context).parent().children().each(function (index, item) {
    $(item).removeClass('sub-active-item')
   })
   $(context).toggleClass('sub-active-item')
  }
  var _subIndex = $(context).index()
  subMenuIndex = _subIndex
  loadPng('0' + (menuIndex + 1) + '0' + (_subIndex + 1))
  if (canClickImgList.indexOf(('' + menuIndex + subMenuIndex)) !== -1) {
   contentWrap.addClass('can-click')
  } else {
   contentWrap.removeClass('can-click')
  }
 }
 // 二级菜单的事件
 $('.sub-menu-1').on('click', '.sub-menu-item', function () {
  changeActiveClass(this)
 })

 $('.sub-menu-2').on('click', '.sub-menu-item', function () {
  changeActiveClass(this)
 })
 $('.sub-menu-3').on('click', '.sub-menu-item', function () {
  changeActiveClass(this)
 })

 contentWrap.on('click', 'img', function () {
  console.log(menuIndex, subMenuIndex)
  console.log(('' + menuIndex + subMenuIndex))
  if (canClickImgList.indexOf(('' + menuIndex + subMenuIndex)) !== -1) {
   var query = '?path=' + ((menuIndex + 1) + '' + (subMenuIndex + 1) + 0)
   window.open('./pages/detail.html' + query)
  }

 })
 // 详情页
 $('.qinghai-header').on('click', 'img', function () {
  var query = '?path=000'
  window.open('./pages/detail.html' + query)
 })
})


