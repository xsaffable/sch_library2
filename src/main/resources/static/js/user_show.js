// 监听form
layui.use('form', function () {
   var form = layui.form;
    layui.use('table', function() {
        var table = layui.table;
        table.render({
            elem: '#user_table',
            height: 'auto',
            url: './user/show.action', //数据接口
            method: 'get',
            page: true, //开启分页
            toolbar: 'default',
            autoSort: false,
            cols: [[ //表头
                {checkbox: true, fixed: true},
                {title: 'id',fixed: 'left',width:'10%',type: "numbers"},
                {field: 'name',title: '姓名'},
                {field: 'password',title: '密码'},
                {field: 'age',title: '年龄'},
                {field: 'sex',title: '性别',width:'10%',
                    // 性别显示转换：1->男，0->女
                    templet :function (row){
                        return sexConv(row.sex);
                    }
                },
                {field: 'createtime',title: '创建时间',sort: true},
                {fixed: 'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
            ]]
        });

        // 监听右侧工具栏
        table.on('tool(user)', function (obj) {
            var data = obj.data; //获得当前行数据
            var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
            var layer = layui.layer;
            switch (layEvent) {
                case 'detail':
                    layer.open({
                        type: 1,
                        title: ['详细信息', 'font-size: 18px'],
                        content: $('#user_show'),
                        area: ['400px', '450px'],
                        btn: ['取消'],
                        // 弹框消失后的回调函数
                        end: function () {
                            $('#user_show').css('display', 'none');
                        },
                        // 弹出成功后的回调函数
                        success: function () {
                            var user = eval(data);
                            $('#user_show input[name="name"]').val(user.name);
                            $('#user_show input[name="password"]').val(user.password);
                            $('#user_show input[name="age"]').val(user.age);
                            if (user.sex == 1) {
                                $('#sex_1').prop('checked', true);
                                $('#sex_0').prop('checked', false);
                            }
                            if (user.sex == 0) {
                                $('#sex_0').prop('checked', true);
                                $('#sex_1').prop('checked', false);
                            }
                            form.render();
                        }
                    });
                    break;
                case 'del':
                    layer.confirm('真的删除行么', function(){
                        var user = eval(data);
                        //向服务端发送删除指令
                        $.ajax({
                            type: 'POST',
                            url: './user/delete.action',
                            data: user,
                            success: function () {
                                obj.del();
                                layer.msg('删除成功');
                            }
                        });
                    });
                    break;
                case 'edit':
                    layer.open({
                        type: 1,
                        title: ['编辑用户', 'font-size: 18px'],
                        content: $("#user_edit"),
                        area: ['400px', '450px'],
                        btn: ['修改', '取消'],
                        yes: function (index) {
                            form.on('submit(editRole)', function (userData) {
                                var userJson = userData.field;
                                var user = eval(userJson);
                                //同步更新缓存对应的值
                                obj.update({
                                    name: user.name,
                                    password: user.password,
                                    age: user.age,
                                    sex: user.sex
                                });
                                layer.close(index); // 关闭弹窗
                                $.ajax({
                                    type: 'POST',
                                    url: './user/edit.action',
                                    data: userJson,
                                    success: function () {
                                        layer.msg('修改成功');
                                    }
                                });
                                return false;
                            });
                        },
                        // 弹出框消失后的回调函数
                        end: function () {
                            $('#user_edit').css('display', 'none');
                        },
                        // 弹出成功后的回调函数
                        success: function (layero, index) {
                            // 向编辑弹窗加载数据
                            var user = eval(data);
                            $('#user_edit input[name="id"]').val(user.id);
                            $('#user_edit input[name="name"]').val(user.name);
                            $('#user_edit input[name="password"]').val(user.password);
                            $('#user_edit input[name="age"]').val(user.age);
                            if (user.sex == 1) {
                                $('#sex_e0').prop('checked', false);
                                $('#sex_e1').prop('checked', true);
                            }
                            if (user.sex == 0) {
                                $('#sex_e1').prop('checked', false);
                                $('#sex_e0').prop('checked', true);
                            }
                            // 将弹窗的按钮修改为form的按钮
                            layero.addClass('layui-form');
                            layero.find('.layui-layer-btn0').attr({
                                'lay-filter': 'editRole',
                                'lay-submit': ''
                            });
                            form.render();
                        }
                    });
                    break;
            }
        });

        // 监听头部工具栏
        table.on('toolbar(user)', function (obj) {
            var userObjs = getChecked(obj);
            var checkStatus = table.checkStatus(obj.config.id);
            var users = checkStatus.data;
            switch (obj.event) {
                case 'add':
                    layer.open({
                        type: 1,
                        title: ['添加用户', 'font-size: 18px'],
                        content: $("#user_edit"),
                        area: ['400px', '450px'],
                        btn: ['提交', '取消'],
                        // 弹出成功后的回调函数
                        success: function (layero) {
                            // 向编辑弹窗加载数据
                            $('#user_edit input[name="id"]').val('');
                            $('#user_edit input[name="name"]').val('');
                            $('#user_edit input[name="password"]').val('');
                            $('#user_edit input[name="age"]').val('');
                            // $('#user_edit input[name="sex"]').val('');
                            // 将弹窗的按钮修改为form的按钮
                            layero.addClass('layui-form');
                            layero.find('.layui-layer-btn0').attr({
                                'lay-filter': 'addRole',
                                'lay-submit': ''
                            });
                            form.render();
                        },
                        // 弹出框消失后的回调函数
                        end: function () {
                            $('#user_edit').css('display', 'none');
                        },
                        yes: function (index) {
                            form.on('submit(addRole)', function (userData) {
                                var userJson = userData.field;
                                layer.close(index); // 关闭弹窗
                                $.ajax({
                                    type: 'POST',
                                    url: './user/add.action',
                                    data: userJson,
                                    success: function () {
                                        layer.msg('添加成功');
                                        table.render({
                                            elem: '#user_table',
                                            height: 'auto',
                                            url: './user/show.action', //数据接口
                                            method: 'get',
                                            page: true, //开启分页
                                            toolbar: 'default',
                                            autoSort: false,
                                            cols: [[ //表头
                                                {checkbox: true, fixed: true},
                                                {title: 'id',fixed: 'left',width:'10%',type: "numbers"},
                                                {field: 'name',title: '姓名'},
                                                {field: 'password',title: '密码'},
                                                {field: 'age',title: '年龄'},
                                                {field: 'sex',title: '性别',width:'10%',
                                                    // 性别显示转换：1->男，0->女
                                                    templet :function (row){
                                                        return sexConv(row.sex);
                                                    }
                                                },
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
                    var size = users.length;
                    if (size <= 0) layer.msg('请选择要删除的行');
                    else
                        layer.confirm('真的要删除这'+size+'行吗', function () {
                            $.each(users, function (index, user) {
                                $.ajax({
                                    type: 'POST',
                                    url: './user/delete.action',
                                    data: user,
                                    success: function () {
                                        userObjs[index].del();
                                        layer.msg('删除成功');
                                    }
                                });
                            });
                        });
                    break;
                case 'update':
                    var size = users.length;
                    if (size <= 0) layer.msg('请选择要编辑的行');
                    else if (size > 1) layer.msg('只能同时编辑一行');
                    else
                        layer.open({
                            type: 1,
                            title: ['编辑用户', 'font-size: 18px'],
                            content: $("#user_edit"),
                            area: ['400px', '450px'],
                            btn: ['修改', '取消'],
                            yes: function (index) {
                                form.on('submit(editRole)', function (userData) {
                                    var userJson = userData.field;
                                    var user = eval(userJson);
                                    //同步更新缓存对应的值
                                    userObjs[0].update({
                                        name: user.name,
                                        password: user.password,
                                        age: user.age,
                                        sex: user.sex
                                    });

                                    layer.close(index); // 关闭弹窗
                                    $.ajax({
                                        type: 'POST',
                                        url: './user/edit.action',
                                        data: userJson,
                                        success: function () {
                                            layer.msg('修改成功');
                                        }
                                    });
                                    return false;
                                });
                            },
                            // 弹出框消失后的回调函数
                            end: function () {
                                $('#user_edit').css('display', 'none');
                            },
                            // 弹出成功后的回调函数
                            success: function (layero, index) {
                                // 向编辑弹窗加载数据
                                var user = eval(users[0]);
                                $('#user_edit input[name="id"]').val(user.id);
                                $('#user_edit input[name="name"]').val(user.name);
                                $('#user_edit input[name="password"]').val(user.password);
                                $('#user_edit input[name="age"]').val(user.age);
                                if (user.sex == 1) {
                                    $('#sex_e0').prop('checked', false);
                                    $('#sex_e1').prop('checked', true);
                                }
                                if (user.sex == 0) {
                                    $('#sex_e1').prop('checked', false);
                                    $('#sex_e0').prop('checked', true);
                                }
                                // 将弹窗的按钮修改为form的按钮
                                layero.addClass('layui-form');
                                layero.find('.layui-layer-btn0').attr({
                                    'lay-filter': 'editRole',
                                    'lay-submit': ''
                                });
                                form.render();
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

        form.on('submit(searchUser)', function (userData) {
            var name = eval(userData.field).name;
            // $('#user_search').val(''); // 搜索框置为空
            table.render({
                elem: '#user_table',
                height: 'auto',
                url: './user/search.action', //数据接口
                method: 'get',
                where: {'name': name},
                page: true, //开启分页
                toolbar: 'default',
                autoSort: false,
                cols: [[ //表头
                    {checkbox: true, fixed: true},
                    {title: 'id',fixed: 'left',width:'10%',type: "numbers"},
                    {field: 'name',title: '姓名'},
                    {field: 'password',title: '密码'},
                    {field: 'age',title: '年龄'},
                    {field: 'sex',title: '性别',width:'10%',
                        // 性别显示转换：1->男，0->女
                        templet :function (row){
                            return sexConv(row.sex);
                        }
                    },
                    {field: 'createtime',title: '创建时间',sort: true},
                    {fixed: 'right',align:'center',toolbar: '#barDemo'} //这里的toolbar值是模板元素的选择器
                ]],
                // done: function (res, curr, count) {
                //     layer.msg('查询到'+count+'条结果');
                // }
            });
            return false;
        });

    });
});

function sexConv(sex) {
    if (sex == 1) return '男';
    if (sex == 0) return '女';
}

