package com.ujn.library2;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@MapperScan("com.ujn.library2.dao")
public class Library2Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(Library2Application.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(Library2Application.class, args);
    }

}
