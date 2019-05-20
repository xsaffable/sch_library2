// 监听form
layui.use('form', function () {
	var form = layui.form;
	// 监听表格
	layui.use('table', function() {
		var table = layui.table;
		table.render({
			elem: '#book_table',
			height: 'auto',
			url: './borrow/getAllByPage.action', //数据接口
			method: 'get',
			page: true, //开启分页
			toolbar: true,
			autoSort: false,
			cols: [[ //表头
				{checkbox: true, fixed: true},
				{title: 'id',fixed: 'left',width:'10%',type: "numbers"},
				{field: 'bookName',title: '书名'},
				{field: 'author',title: '作者'},
				{field: 'category',title: '分类',width:'10%'},
				{field: 'username',title: '借阅人'},
				{field: 'state',title: '借阅状态',width:'10%',
					// 状态显示转换：0->借阅，1->归还
					templet :function (row){
						return stateConv(row.state);
					}
				},
				{field: 'createtime',title: '创建时间',sort: true},
				{fixed:'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
			]],
			// done: function (res) {
			// 	console.info(res)
			// }
		});

		//监听工具条
		table.on('tool(book)', function(obj){ //注：tool是工具条事件名，book是table原始容器的属性 lay-filter="对应的值"
			var data = obj.data; //获得当前行数据
			var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
			// var tr = obj.tr; //获得当前行 tr 的DOM对象
			var layer = layui.layer;

			if(layEvent === 'detail'){ //查看
				layer.open({
					type: 1,
					title: ['详细信息', 'font-size: 18px'],
					content: $('#book_show'),
					area: ['400px', '450px'],
					btn: ['取消'],
					// 弹框消失后的回调函数
					end: function () {
						$('#book_show').css('display', 'none');
					},
					// 弹出成功后的回调函数
					success: function () {
						var book = eval(data);
						$('#book_show input[name="bookName"]').val(book.bookName);
						$('#book_show input[name="author"]').val(book.author);
						$('#book_show input[name="username"]').val(book.username);
						$('#book_show input[name="category"]').val(book.category);
						if (book.state === 0) {
							$('#book_show input[name="state"]').val("借阅");
						} else {
							$('#book_show input[name="state"]').val("归还");
						}
					}
				})
			} else if(layEvent === 'del'){ //删除
				layer.confirm('真的删除行么', function(){
				    var book = eval(data);
                    //向服务端发送删除指令
                    $.ajax({
                        type: 'POST',
                        url: './book/delete.action',
                        data: book,
                        success: function () {
                            obj.del();
                            layer.msg('删除成功');
                        }
                    });
				});
			} else if(layEvent === 'edit'){ //编辑
				layer.open({
					type: 1,
					title: ['编辑书籍', 'font-size: 18px'],
					content: $("#book_edit"),
					area: ['400px', '450px'],
					btn: ['修改', '取消'],
					yes: function (index) {
						form.on('submit(editRole)', function (bookData) {
							var bookJson = bookData.field;
							var book = eval(bookJson);
							//同步更新缓存对应的值
							obj.update({
								bookName: book.bookName,
								author: book.author,
								press: book.press,
								category: book.category
							});
							layer.close(index); // 关闭弹窗
							$.ajax({
								type: 'POST',
								url: './book/edit.action',
								data: bookJson,
								success: function () {
									layer.msg('修改成功');
								}
							});
							return false;
						});
					},
					// 弹出框消失后的回调函数
					end: function () {
						$('#book_edit').css('display', 'none');
					},
					// 弹出成功后的回调函数
					success: function (layero, index) {
						// 向编辑弹窗加载数据
						var book = eval(data);
						$('#book_edit input[name="id"]').val(book.id);
						$('#book_edit input[name="bookName"]').val(book.bookName);
						$('#book_edit input[name="author"]').val(book.author);
						$('#book_edit input[name="press"]').val(book.press);
						$('#book_edit input[name="category"]').val(book.category);
						// 将弹窗的按钮修改为form的按钮
						layero.addClass('layui-form')
						layero.find('.layui-layer-btn0').attr({
							'lay-filter': 'editRole',
							'lay-submit': ''
						})
					}
				});
			}
		});

		form.on('submit(searchBook)', function (username) {
			var username = eval(username.field).username;
			// $('#book_search').val(''); // 搜索框置为空
			table.render({
				elem: '#book_table',
				height: 'auto',
				url: './borrow/getAllByPageByUsername.action', //数据接口
				where: {username: username},
				method: 'get',
				page: true, //开启分页
				toolbar: true,
				autoSort: false,
				cols: [[ //表头
					{checkbox: true, fixed: true},
					{title: 'id',fixed: 'left',width:'10%',type: "numbers"},
					{field: 'bookName',title: '书名'},
					{field: 'author',title: '作者'},
					{field: 'category',title: '分类',width:'10%'},
					{field: 'username',title: '借阅人'},
					{field: 'state',title: '借阅状态',width:'10%',
						// 状态显示转换：0->借阅，1->归还
						templet :function (row){
							return stateConv(row.state);
						}
					},
					{field: 'createtime',title: '创建时间',sort: true},
					{fixed:'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
				]],
				// done: function (res, curr, count) {
				// 	layer.msg('查询到'+count+'条结果');
				// }
			});

			return false;
		});

	});

});

function stateConv(state) {
	if (state == 0) return '借阅';
	else return '归还';
}




