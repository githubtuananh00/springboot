package com.example.springboot.api;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;

@RequestMapping(path = "/")
@Controller
@RequiredArgsConstructor
public class Home {
    @GetMapping(path = "/")
    public String HomeController(){
        return "Home";
    }
    @GetMapping(path = "/test")
    public String Test(){
        return "Test";
    }
//    @GetMapping(path = "/login")
//    public String login(){
//        return "login";
//    }
}
