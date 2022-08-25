package com.example.springboot.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import com.example.springboot.Repo.UserRepository;
import com.example.springboot.module.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserServiceImpl implements UserService, UserDetailsService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            log.error("User not found in the database");
            throw new UsernameNotFoundException("User not found in the database");
        } else {
            log.info("User found in the database {}", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getUsername()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(),
                user.getPassword(), authorities);
        // String name= user.getUser_name();
        // String password = user.getPassword();
        // return new org.springframework.security.core.userdetails.User(name,password,new
        // ArrayList<>());
    }

    // @Override
    // public User getUser(String user_name) {
    // // TODO Auto-generated method stub
    //// MongoTemplate mongoTemplate = new MongoTemplate(new SimpleMongoDbFactory(mongoClient(),
    // getDatabaseName()));
    //// Query query = new Query();
    //// query.addCriteria(Criteria.where("user_name").is(user_name));
    //// log.info("Fetching user {}",user_name);
    // // List<User> users = mongoTemplate.find();
    // return userRepository.findOne(
    // Query.query(Criteria.where("user_name").is(user_name)),
    // User.class,COLLECTION_NAME);
    // }
    //
    @Override
    public List<User> getUsers() {
        // TODO Auto-generated method stub
        log.info("Fetching all users");
        return userRepository.findAll();
    }

    @Override
    public User findByUserName(String username) {
        log.info("Found username {}",username);
        return userRepository.findByUsername(username);
    }

    @Override
    public User saveUser(User user) {
        log.info("Saving new User {} to the database", user.getUsername());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // TODO Auto-generated method stub
        return userRepository.save(user);
    }

}
