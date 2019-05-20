package com.ujn.library2.controller;

import com.ujn.library2.util.SessionMap;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping("/login")
public class LoginController {

    @ResponseBody
    @RequestMapping(value = "/login.action", method = RequestMethod.POST)
    public String login(String name, String password, HttpServletRequest request) throws Exception {
        boolean isLogin = false;
        if (("affable".equals(name)) && ("123".equals(password))) {
            isLogin = true;
        }
        // 登录成功
        if (isLogin) {
            // 将name放入session
            HttpSession session = request.getSession();
            session.setAttribute("username", name);
            // 然后加入新的
            SessionMap.sessionMap.put(name, session);
            return "yes";
        } else { // 登录失败
            return "用户名/密码错误";
        }
    }

    @RequestMapping(value = "/saveName.action", method = RequestMethod.GET)
    public String saveName() throws Exception {
        return "/index";
    }

    @GetMapping(value = "/logout.action")
    public String logout(HttpServletRequest request) throws Exception {
        HttpSession session = request.getSession();
        String username = (String) session.getAttribute("username");
        SessionMap.sessionMap.remove(username); // 移除session
        session.invalidate(); // 销毁session
        return "/login";
    }


}
