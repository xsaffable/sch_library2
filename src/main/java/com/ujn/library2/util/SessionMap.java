package com.ujn.library2.util;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

public class SessionMap {

    // 保存着所有已登录用户的session
    public static Map<String, HttpSession> sessionMap = new HashMap<>();

}
