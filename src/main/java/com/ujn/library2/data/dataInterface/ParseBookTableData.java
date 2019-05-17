package com.ujn.library2.data.dataInterface;

import com.ujn.library2.data.dataEntity.BookTableData;
import com.ujn.library2.entity.Book;
import com.ujn.library2.entity.NewBook;
import com.ujn.library2.service.BookService;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.List;

@Component
public class ParseBookTableData {

    @Resource
    private BookTableData bookTableData;

    /**
     * 分页获取所有的书
     * @param page
     * @param limit
     * @return
     */
    public BookTableData getAllByPage(String page, String limit, BookService bookService) throws Exception {
        int pageSize = Integer.valueOf(limit);
        int start = (Integer.valueOf(page) - 1) * pageSize;
        List<Book> data = bookService.getAllByPage(start, pageSize);
        int count = bookService.count();
        bookTableData.set("0", "所有的书", String.valueOf(count), data);
        return bookTableData;
    }

    /**
     * 根据书名模糊搜索
     * @param bookName
     * @return
     * @throws Exception
     */
    public BookTableData getByBookName(String bookName, BookService bookService) throws Exception {
        List<Book> books = bookService.getByBookName(bookName);
        int count = books.size();
        bookTableData.set("0", "根据书名模糊搜索", String.valueOf(count), books);
        return bookTableData;
    }

}
