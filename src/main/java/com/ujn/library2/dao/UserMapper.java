package com.ujn.library2.dao;

import org.apache.ibatis.annotations.Param;
import com.ujn.library2.entity.User;

import java.util.List;

public interface UserMapper {

    List<User> getAllByPage(@Param("start") int start, @Param("pageSize") int pageSize) throws Exception;

    int count() throws Exception;

    void addUser(User user) throws Exception;

    void delUser(User user) throws Exception;

    void updateUser(User user) throws Exception;

    List<User> getUserByName(@Param("name") String name) throws Exception;

}
