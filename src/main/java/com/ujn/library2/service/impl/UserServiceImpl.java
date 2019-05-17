package com.ujn.library2.service.impl;

import com.ujn.library2.dao.UserMapper;
import com.ujn.library2.entity.User;
import com.ujn.library2.service.UserService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

@Service("userService")
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;

    @Override
    public List<User> getAllByPage(int start, int pageSize) throws Exception {
        return userMapper.getAllByPage(start, pageSize);
    }

    @Override
    public int count() throws Exception {
        return userMapper.count();
    }

    @Override
    public void addUser(User user) throws Exception {
        user.setId(UUID.randomUUID().toString());
        userMapper.addUser(user);
    }

    @Override
    public void delUser(User user) throws Exception {
        userMapper.delUser(user);
    }

    @Override
    public void updateUser(User user) throws Exception {
        userMapper.updateUser(user);
    }

    @Override
    public List<User> getUserByName(String name) throws Exception {
        return userMapper.getUserByName(name);
    }
}
