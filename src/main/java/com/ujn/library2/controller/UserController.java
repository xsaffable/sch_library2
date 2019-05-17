package com.ujn.library2.controller;

import com.ujn.library2.data.dataEntity.UserTableData;
import com.ujn.library2.data.dataInterface.ParseUserTableData;
import com.ujn.library2.entity.User;
import com.ujn.library2.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService userService;
    @Resource
    private ParseUserTableData parseUserTableData;

    @ResponseBody
    @RequestMapping(value = "/show.action", method = RequestMethod.GET)
    public UserTableData getAllByPage(String page, String limit) throws Exception {
        return parseUserTableData.getAllByPage(page, limit, userService);
    }

    @ResponseBody
    @RequestMapping(value = "/add.action", method = RequestMethod.POST)
    public void addUser(User user) throws Exception {
        userService.addUser(user);
    }

    @ResponseBody
    @RequestMapping(value = "/delete.action", method = RequestMethod.POST)
    public void delUser(User user) throws Exception {
        userService.delUser(user);
    }

    @ResponseBody
    @RequestMapping(value = "/edit.action", method = RequestMethod.POST)
    public void updateUser(User user) throws Exception {
        userService.updateUser(user);
    }

    @ResponseBody
    @RequestMapping(value = "/search.action", method = RequestMethod.GET)
    public UserTableData getUserByName(String name) throws Exception {
        return parseUserTableData.getByBookName(name, userService);
    }

}
