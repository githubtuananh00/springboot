package com.example.springboot.service;

import com.example.springboot.module.User;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    // User getUser(String user_name);
    List<User> getUsers();
    User findByUserName(String username);
}
