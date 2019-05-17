//注意：导航 依赖 element 模块，否则无法进行功能性操作
layui.use('element', function() {
	var element = layui.element;
	element.on('nav(leftNavbar)', function(elem) {
		var data = elem.data().options
		if (data == 'user_show') {
			// 判断是否已经有此选项卡
			var isShow = false
			$.each($('#container ul[class="layui-tab-title"] li'), function () {
				if ($(this).attr("lay-id") == "user_show") {
					isShow = true;
				}
			})
			if(!isShow) {
				element.tabAdd('tabs', {
					title: '普通用户管理',
					content: '<iframe scrolling="auto" frameborder="0"  src="./user_show.action" style="width:100%;height:580px;"></iframe>',
					id: 'user_show'
				});
			}
			element.tabChange('tabs', 'user_show')
		} else if (data == "book_show") {
			var isShow = false
			$.each($('#container ul[class="layui-tab-title"] li'), function () {
				if ($(this).attr("lay-id") == "book_show") {
					isShow = true;
				}
			})
			if(!isShow) {
				element.tabAdd('tabs', {
					title: '图书编辑',
					content: '<iframe scrolling="auto" frameborder="0"  src="./book_show.action" style="width:100%;height:580px;"></iframe>',
					id: 'book_show'
				});
			}
			element.tabChange('tabs', 'book_show')
		}
		
	});
});