package com.ujn.library2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(value = "/")
    public String index() throws Exception {
        return "/login";
    }

    @RequestMapping(value = "/book_show.action",method = RequestMethod.GET)
    public String bookShow() {
        return "/book_show";
    }

    @RequestMapping(value = "/user_show.action", method = RequestMethod.GET)
    public String userShow() {
        return "/user_show";
    }

    @GetMapping(value = "/borrow_message.action")
    public String borrMessage() {
        return "/borrow_message";
    }

}
