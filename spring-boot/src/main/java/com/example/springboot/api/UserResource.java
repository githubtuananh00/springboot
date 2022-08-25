package com.example.springboot.api;

import com.example.springboot.module.AuthenticateResponse;
import com.example.springboot.module.ResponseObj;
import com.example.springboot.module.User;
import com.example.springboot.service.UserService;
import com.example.springboot.util.JwtUtil;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
// import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;


import java.net.URI;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/api")
@RequiredArgsConstructor

public class UserResource {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;
    private final UserService userService;

    @GetMapping(path = "/auth")
    public ResponseEntity<ResponseObj> verifyToken(@RequestHeader(value = "authorization", defaultValue = "") String auth){
        System.out.println(auth);
        String token = auth.substring(7);
        System.out.println(auth);

        return ResponseEntity.status(200)
                .body(new ResponseObj(true,"Verify token",jwtUtil.verifyToken(token)));
    }

    @GetMapping(path = "/users")
    public ResponseEntity<ResponseObj> getUser() {
        // return ResponseEntity.ok().body(userService.getUsers());
        return ResponseEntity.status(200)
                .body(new ResponseObj(true, "Get all users", userService.getUsers()));
    }

    @PostMapping(path = "/register")
    public ResponseEntity<ResponseObj> registerUser(@RequestBody User user) {
        String username = user.getUsername();
        String password = user.getPassword();
        User user1 = userService.findByUserName(username);
        if (user1 != null) {
            return ResponseEntity.status(400)
                    .body(new ResponseObj(false, "User already exists", null));
        }
        if (username.length() > 20) {
            return ResponseEntity.status(400).body(new ResponseObj(false,
                    "Max length username 20. Please re-enter username", null));
        }
        if (password.length() < 6 || password.length() > 15) {
            return ResponseEntity.status(400).body(new ResponseObj(false,
                    "Password has at least 6 characters and maximum is 15 characters . Please re-enter password",
                    null));
        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("api/user/register").toUriString());
        // return ResponseEntity.created(uri).body(userService.saveUser(user));
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObj(true, "Register successfully", userService.saveUser(user)));
    }

    @PostMapping(path = "/login")
    public ResponseEntity<ResponseObj> login(@RequestBody User user) throws Exception {
        String username = user.getUsername();
        String password = user.getPassword();
        if (username.length() * password.length() == 0)
            return ResponseEntity.status(400)
                    .body(new ResponseObj(false, "Missing username or password", null));
        User user1 = userService.findByUserName(username);

        if (user1 == null) {
            return ResponseEntity.status(400)
                    .body(new ResponseObj(false, "Incorrect Username or Password", null));
        }

        boolean passwordValid = passwordEncoder.matches(password, user1.getPassword());
        // System.out.println(passwordEncoder.matches("123456",passwordValid));
        if (!passwordValid) {
            return ResponseEntity.status(400)
                    .body(new ResponseObj(false, "Incorrect Username or Password", null));
        }

        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(username, password);
            authenticationManager.authenticate(authenticationToken);

        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect Username or Password", e);
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

        final String jwt = jwtUtil.generateToken(userDetails);


        return ResponseEntity.status(200)
                .body(new ResponseObj(true, "Login successfully", new AuthenticateResponse(jwt)));
    }

}


