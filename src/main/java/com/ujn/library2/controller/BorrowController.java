package com.ujn.library2.controller;

import com.ujn.library2.service.BorrowingRecordService;
import com.ujn.library2.util.ResponseResultVO;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;

@Controller
@RequestMapping("/borrow")
public class BorrowController {

    @Resource
    private BorrowingRecordService borrowingRecordService;

    @ResponseBody
    @RequestMapping(value = "/getAllByPage.action")
    public ResponseResultVO getAllByPage(String page, String limit) throws Exception {
        return borrowingRecordService.getAllByPage(page, limit);
    }

    @ResponseBody
    @RequestMapping(value = "/getAllByPageByUsername.action")
    public ResponseResultVO getAllByPageByUsername(String page, String limit, String username) throws Exception {
        return borrowingRecordService.getAllByPageByUsername(page, limit, username);
    }

}
