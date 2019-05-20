package com.ujn.library2.service;

import com.ujn.library2.util.ResponseResultVO;

public interface BorrowingRecordService {

    int countAll() throws Exception;

    int countAllByUsername(String username) throws Exception;

    ResponseResultVO getAllByPage(String page, String limit) throws Exception;

    ResponseResultVO getAllByPageByUsername(String page, String limit, String username) throws Exception;

}
