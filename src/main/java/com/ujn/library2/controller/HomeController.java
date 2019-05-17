package com.ujn.library2.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HomeController {

    @RequestMapping(value = "/index",method = RequestMethod.GET)
    public String sayHello() {
        return "/index";
    }

    @RequestMapping(value = "/book_show.action",method = RequestMethod.GET)
    public String bookShow() {
        return "/book_show";
    }

    @RequestMapping(value = "/user_show.action", method = RequestMethod.GET)
    public String userShow() {
        return "/user_show";
    }

}
