package com.ujn.library2.dao;

import com.ujn.library2.entity.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookMapper {

    List<Book> getAllByPage(@Param("start") int start, @Param("pageSize") int pageSize) throws Exception;

    int count() throws Exception;

    int countByName(String bookName) throws Exception;

    void updateBook(Book book) throws Exception;

    void addBook(Book book) throws Exception;

    void delBook(Book book) throws Exception;

    List<Book> getByBookName(@Param("bookName") String bookName) throws Exception;

    List<Book> getAllByPageByName(@Param("start") int start, @Param("pageSize") int pageSize, @Param("bookName") String bookName) throws Exception;

}