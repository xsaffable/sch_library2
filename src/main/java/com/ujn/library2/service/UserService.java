package com.ujn.library2.service;

import com.ujn.library2.entity.User;

import java.util.List;

public interface UserService {

    List<User> getAllByPage(int start, int pageSize) throws Exception;

    int count() throws Exception;

    void addUser(User user) throws Exception;

    void delUser(User user) throws Exception;

    void updateUser(User user) throws Exception;

    List<User> getUserByName(String name) throws Exception;

}
