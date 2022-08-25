package com.example.springboot.module;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


import javax.validation.constraints.Max;
import java.util.Objects;

@Data
@Document
public class Student {
    @Id
    @Field(name = "studentId")
    private ObjectId student_id;
    @Max(value = 20,message = "Max length Student Name 20")
    @Indexed(unique = true)
    private String studentName;
    @Max(value = 10,message = "Max length Student code 10")
    @Indexed(unique = true)
    private String studentCode;





}
