package com.ujn.library2.data.dataEntity;

import com.ujn.library2.entity.User;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserTableData {

    private String code;
    private String msg;
    private String count;
    private List<User> data;

    public void set(String code, String msg, String count, List<User> data) {
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

    public List<User> getData() {
        return data;
    }

    public void setData(List<User> data) {
        this.data = data;
    }
}
