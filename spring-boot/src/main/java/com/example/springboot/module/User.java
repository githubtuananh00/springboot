package com.example.springboot.module;

import java.util.Objects;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
@Document
public class User {
    @Id
    private ObjectId user_id;
    // @Field(name = "username")
    @Indexed(unique = true)
    @Max(value = 20, message = "Max length username 20")
    @NotNull(message = "username cannot null")
    private String username;
    @Max(value = 15, message = "Max length password 15")
    @Min(value = 6,message = "Min length password 6")
    @NotNull(message = "password cannot null")
    private String password;

    @Max(value = 15, message = "Max length confirm Password 15")
    @Min(value = 6,message = "Min length confirm Password 6")
    private String confirmPassword;



    public User() {}

    public User(ObjectId user_id, String username, String password) {
        this.user_id = user_id;
        this.username = username;
        this.password = password;
    }

    public ObjectId getUser_id() {
        return this.user_id;
    }

    public void setUser_id(ObjectId user_id) {
        this.user_id = user_id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public User user_id(ObjectId user_id) {
        setUser_id(user_id);
        return this;
    }

    public User username(String username) {
        setUsername(username);
        return this;
    }

    public User password(String password) {
        setPassword(password);
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (o == this)
            return true;
        if (!(o instanceof User)) {
            return false;
        }
        User user = (User) o;
        return Objects.equals(user_id, user.user_id) && Objects.equals(username, user.username)
                && Objects.equals(password, user.password);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, username, password);
    }

    @Override
    public String toString() {
        return "{" + " user_id='" + getUser_id() + "'" + ", username='" + getUsername() + "'"
                + ", password='" + getPassword() + "'" + "}";
    }


}
