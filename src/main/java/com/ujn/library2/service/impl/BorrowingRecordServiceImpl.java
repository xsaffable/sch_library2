package com.ujn.library2.service.impl;

import com.ujn.library2.dao.BorrowingRecordMapper;
import com.ujn.library2.entity.BorrowBook;
import com.ujn.library2.service.BorrowingRecordService;
import com.ujn.library2.util.ResponseResultVO;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("borrowingRecordService")
public class BorrowingRecordServiceImpl implements BorrowingRecordService {

    @Resource
    private BorrowingRecordMapper borrowingRecordMapper;

    @Override
    public int countAll() throws Exception {
        return borrowingRecordMapper.countAll();
    }

    @Override
    public int countAllByUsername(String username) throws Exception {
        return borrowingRecordMapper.countAllByUsername(username);
    }

    @Override
    public ResponseResultVO getAllByPage(String page, String limit) throws Exception {
        int pageSize = Integer.valueOf(limit);
        int start = (Integer.valueOf(page) - 1) * pageSize;
        List<BorrowBook> borrs = borrowingRecordMapper.getAllByPage(start, pageSize);
        ResponseResultVO re = new ResponseResultVO();
        re.setCode("0");
        re.setCount(countAll());
        re.setData(borrs);
        return re;
    }

    @Override
    public ResponseResultVO getAllByPageByUsername(String page, String limit, String username) throws Exception {
        int pageSize = Integer.valueOf(limit);
        int start = (Integer.valueOf(page) - 1) * pageSize;
        List<BorrowBook> borrs = borrowingRecordMapper.getAllByPageByUsername(start, pageSize, username);
        ResponseResultVO re = new ResponseResultVO();
        re.setCode("0");
        re.setCount(countAllByUsername(username));
        re.setData(borrs);
        return re;
    }
}
