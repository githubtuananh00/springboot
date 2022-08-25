package com.example.springboot.module;

import lombok.Data;
import org.apache.catalina.mapper.Mapper;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.validation.constraints.Max;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Data
public class Student_info {
    @Id
    @Field(name = "info_id")
    private ObjectId infoId;

    @Indexed(unique = true)
    @NotNull(message = "StudentId cannot null")
    @DBRef
    private Student student;
    @Max(value = 255,message = "Max length Student Address 255")
    private String studentAddress;
    private Double averageScore;
    @Max(value = 10,message = "Max length Date of Birth 10")
    private LocalDate dateOfBirth;



}
