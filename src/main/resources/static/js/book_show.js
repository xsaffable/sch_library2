// 监听form
layui.use('form', function () {
	var form = layui.form;
	// 监听表格
	layui.use('table', function() {
		var table = layui.table;
		table.render({
			elem: '#book_table',
			height: 'auto',
			url: './book/show.action', //数据接口
			method: 'get',
			page: true, //开启分页
			toolbar: 'default',
			autoSort: false,
			cols: [[ //表头
				{checkbox: true, fixed: true},
				{title: 'id',fixed: 'left',width:'10%',type: "numbers"},
				{field: 'bookName',title: '书名'},
				{field: 'author',title: '作者'},
				{field: 'press',title: '出版社'},
				{field: 'category',title: '分类',width:'10%'},
				{field: 'createtime',title: '创建时间',sort: true},
				{fixed: 'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
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
						$('#book_show input[name="press"]').val(book.press);
						$('#book_show input[name="category"]').val(book.category);
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

		// 监听头部工具栏
		table.on('toolbar(book)', function(obj){
			var bookObjs = getChecked(obj);
			var checkStatus = table.checkStatus(obj.config.id);
			var data = checkStatus.data[0];
			switch(obj.event){
				case 'add':
					layer.open({
						type: 1,
						title: ['添加书籍', 'font-size: 18px'],
						content: $("#book_edit"),
						area: ['400px', '450px'],
						btn: ['提交', '取消'],
						// 弹出成功后的回调函数
						success: function (layero) {
							// 向编辑弹窗加载数据
							$('#book_edit input[name="id"]').val('');
							$('#book_edit input[name="bookName"]').val('');
							$('#book_edit input[name="author"]').val('');
							$('#book_edit input[name="press"]').val('');
							$('#book_edit input[name="category"]').val('');
							// 将弹窗的按钮修改为form的按钮
							layero.addClass('layui-form');
							layero.find('.layui-layer-btn0').attr({
								'lay-filter': 'addRole',
								'lay-submit': ''
							})
						},
						// 弹出框消失后的回调函数
						end: function () {
							$('#book_edit').css('display', 'none');
						},
						yes: function (index) {
							form.on('submit(addRole)', function (bookData) {
								var bookJson = bookData.field;
								layer.close(index); // 关闭弹窗
								$.ajax({
									type: 'POST',
									url: './book/add.action',
									data: bookJson,
									success: function () {
										layer.msg('添加成功');
										table.render({
											elem: '#book_table',
											height: 'auto',
											url: './book/show.action', //数据接口
											method: 'get',
											page: true, //开启分页
											toolbar: 'default',
											autoSort: false,
											cols: [[ //表头
												{checkbox: true, fixed: true},
												{title: 'id',fixed: 'left',width:'10%',type: "numbers"},
												{field: 'bookName',title: '书名'},
												{field: 'author',title: '作者'},
												{field: 'press',title: '出版社'},
												{field: 'category',title: '分类',width:'10%'},
												{field: 'createtime',title: '创建时间',sort: true},
												{fixed: 'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
											]]
										});
									}
								});
								return false;
							});
						}
					});
					break;
				case 'delete':
					var books = checkStatus.data;
					var size = books.length;
					if (size <= 0) layer.msg('请选择要删除的行');
					else
						layer.confirm('真的要删除这'+size+'行吗', function () {
							$.each(books, function (index, book) {
								$.ajax({
									type: 'POST',
									url: './book/delete.action',
									data: book,
									success: function () {
										bookObjs[index].del();
										layer.msg('删除成功');
									}
								});
							});
						});
					break;
				case 'update':
					var size = checkStatus.data.length;
					if (size <= 0) layer.msg('请选择要编辑的行');
					else if (size > 1) layer.msg('只能同时编辑一行');
					else
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
									bookObjs[0].update({
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
					break;
			}
		});

		//*******************************************工具******************************************************
		//获取所有选中行对象 obj=头工具栏对象
		function getChecked(obj){
			obj.trObjs=[];
			var that={};
			that.elem=obj.config.elem.next();
			that.layBody = that.elem.find('.layui-table-body');
			that.key=obj.config.id;
			that.layBody.find('.layui-form-checked').each(function(){
				obj.trObjs.push(commonMember(that,$(this)));
			});
			return obj.trObjs;
		}

		//数据行中的事件监听返回的公共对象成员
		var commonMember = function(that,othis,sets){
			var ELEM_CELL = '.layui-table-cell';
			var index = othis.parents('tr').eq(0).data('index')
				,tr = that.layBody.find('tr[data-index="'+ index +'"]')
				,data = table.cache[that.key][index];
			return $.extend({
				tr: tr //行元素
				,data: table.clearCacheKey(data) //当前行数据
				,del: function(){ //删除行数据
					table.cache[that.key][index] = [];
					tr.remove();
					// that.scrollPatch();
				}
				,update: function(fields){ //修改行数据
					fields = fields || {};
					layui.each(fields, function(key, value){
						if(key in data){
							var templet, td = tr.children('td[data-field="'+ key +'"]');
							data[key] = value;
							table.eachCols(function(i, item2){
								if(item2.field == key && item2.templet){
									templet = item2.templet;
								}
							});
							td.children(ELEM_CELL).html(function(){
								return templet ? function(){
									return typeof templet === 'function'
										? templet(data)
										: laytpl($(templet).html() || value).render(data)
								}() : value;
							}());
							td.data('content', value);
						}
					});
				}
			}, sets);
		};
		//*********************************************************************************************


		form.on('submit(searchBook)', function (bookData) {
			var bookName = eval(bookData.field).bookName;
			// $('#book_search').val(''); // 搜索框置为空
			table.render({
				elem: '#book_table',
				height: 'auto',
				url: './book/search.action', //数据接口
				method: 'get',
				where: {'bookName': bookName},
				page: true, //开启分页
				toolbar: 'default',
				autoSort: false,
				cols: [[ //表头
					{checkbox: true, fixed: true},
					{title: 'id',fixed: 'left',width:'10%',type: "numbers"},
					{field: 'bookName',title: '书名'},
					{field: 'author',title: '作者'},
					{field: 'press',title: '出版社'},
					{field: 'category',title: '分类',width:'10%'},
					{field: 'createtime',title: '创建时间',sort: true},
					{fixed: 'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
				]],
				// done: function (res, curr, count) {
				// 	layer.msg('查询到'+count+'条结果');
				// }
			});

			return false;
		});

	});

});





