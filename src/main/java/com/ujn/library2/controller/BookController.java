package com.ujn.library2.controller;

import com.ujn.library2.data.dataEntity.BookTableData;
import com.ujn.library2.data.dataInterface.ParseBookTableData;
import com.ujn.library2.entity.Book;
import com.ujn.library2.service.BookService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

@Controller
@RequestMapping("/book")
public class BookController {

    @Resource
    private BookService bookService;
    @Resource
    private ParseBookTableData parseBookTableData;

    @ResponseBody
    @RequestMapping(value = "/show.action", method = RequestMethod.GET)
    public BookTableData getAllByPage(String page, String limit) throws Exception {
        return parseBookTableData.getAllByPage(page, limit, bookService);
    }

    @ResponseBody
    @RequestMapping(value = "/edit.action", method = RequestMethod.POST)
    public void updateBook(Book book) throws Exception {
        bookService.updateBook(book);
    }

    @ResponseBody
    @RequestMapping(value = "/add.action", method = RequestMethod.POST)
    public void addBook(Book book) throws Exception {
        bookService.addBook(book);
    }

    @ResponseBody
    @RequestMapping(value = "/delete.action", method = RequestMethod.POST)
    public void delBook(Book book) throws Exception {
        bookService.delBook(book);
    }

    @ResponseBody
    @RequestMapping(value = "/search.action", method = RequestMethod.GET)
    public BookTableData getByBookName(String bookName) throws Exception {
        return parseBookTableData.getByBookName(bookName, bookService);
    }

}
