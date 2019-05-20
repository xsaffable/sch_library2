package com.ujn.library2.service;

import com.ujn.library2.entity.Book;
import com.ujn.library2.util.ResponseResultVO;

import java.util.List;

public interface BookService {

    List<Book> getAllByPage(int start, int pageSize) throws Exception;

    ResponseResultVO getAllByPageByName(String page, String limit, String bookName) throws Exception;

    int count() throws Exception;

    void updateBook(Book book) throws Exception;

    void addBook(Book book) throws Exception;

    void delBook(Book book) throws Exception;

    List<Book> getByBookName(String bookName) throws Exception;

}
