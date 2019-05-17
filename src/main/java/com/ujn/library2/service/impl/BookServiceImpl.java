package com.ujn.library2.service.impl;

import com.ujn.library2.dao.BookMapper;
import com.ujn.library2.entity.Book;
import com.ujn.library2.service.BookService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

@Service("bookService")
public class BookServiceImpl implements BookService {

    @Resource
    private BookMapper bookMapper;

    @Override
    public List<Book> getAllByPage(int start, int pageSize) throws Exception {
        return bookMapper.getAllByPage(start, pageSize);
    }

    @Override
    public int count() throws Exception {
        return bookMapper.count();
    }

    @Override
    public void updateBook(Book book) throws Exception {
        bookMapper.updateBook(book);
    }

    @Override
    public void addBook(Book book) throws Exception {
        book.setId(UUID.randomUUID().toString());
        bookMapper.addBook(book);
    }

    @Override
    public void delBook(Book book) throws Exception {
        bookMapper.delBook(book);
    }

    @Override
    public List<Book> getByBookName(String bookName) throws Exception {
        return bookMapper.getByBookName(bookName);
    }
}
