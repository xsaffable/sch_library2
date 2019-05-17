package com.ujn.library2.data.dataEntity;

import com.ujn.library2.entity.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookTableData {

    private String code;
    private String msg;
    private String count;
    private List<Book> data;

    public void set(String code, String msg, String count, List<Book> data) {
        this.code = code;
        this.msg = msg;
        this.count = count;
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public List<Book> getData() {
        return data;
    }

    public void setData(List<Book> data) {
        this.data = data;
    }
}
