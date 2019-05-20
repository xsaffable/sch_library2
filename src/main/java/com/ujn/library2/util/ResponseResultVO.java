package com.ujn.library2.util;

import java.io.Serializable;

/**
 * 
 * @author yanglei
 * @desc 返回页面的数据类型
 *
 */
public class ResponseResultVO implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**状态码*/
	private String code;
	/**提示信息*/
	private String msg;
	/**响应数据*/
	private Object data;
	/**总数量*/
	private int count;
	/**响应数据数量*/
	private int limit;
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
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getLimit() {
		return limit;
	}
	public void setLimit(int limit) {
		this.limit = limit;
	}

	public static ResponseResultVO processBusinessException(String message){
		if(null==message){
			message="未知异常";
		}
		ResponseResultVO result = new ResponseResultVO();
		result.setMsg(message);
		result.setData(null);
		result.setCode("1");
		result.setCount(0);
		result.setLimit(0);
		return result;
	}
	
	public static ResponseResultVO success(String msg, Object data,int count,int size){
		ResponseResultVO result = new ResponseResultVO();
		result.setMsg(msg);
		result.setData(data);
		result.setCode("0");
		result.setCount(count);
		result.setLimit(size);
		return result;
	}
}
