package com.ujn.library2.dao;

import com.ujn.library2.entity.BorrowBook;

import java.util.List;

public interface BorrowingRecordMapper {

    int countAll() throws Exception;

    int countAllByUsername(String username) throws Exception;

    List<BorrowBook> getAllByPage(int start, int pageSize) throws Exception;

    List<BorrowBook> getAllByPageByUsername(int start, int pageSize, String username) throws Exception;

}
