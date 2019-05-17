package com.ujn.library2.data.dataInterface;

import com.ujn.library2.data.dataEntity.UserTableData;
import com.ujn.library2.entity.User;
import com.ujn.library2.service.UserService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class ParseUserTableData {

    @Resource
    private UserTableData userTableData;

    /**
     * 分页获取所有的人
     * @param page
     * @param limit
     * @return
     */
    public UserTableData getAllByPage(String page, String limit, UserService userService) throws Exception {
        int pageSize = Integer.valueOf(limit);
        int start = (Integer.valueOf(page) - 1) * pageSize;
        List<User> data = userService.getAllByPage(start, pageSize);
        int count = userService.count();
        userTableData.set("0", "所有的人", String.valueOf(count), data);
        return userTableData;
    }

    /**
     * 根据书名模糊搜索
     * @param name
     * @return
     * @throws Exception
     */
    public UserTableData getByBookName(String name, UserService userService) throws Exception {
        List<User> users = userService.getUserByName(name);
        int count = users.size();
        userTableData.set("0", "根据书名模糊搜索", String.valueOf(count), users);
        return userTableData;
    }

}
