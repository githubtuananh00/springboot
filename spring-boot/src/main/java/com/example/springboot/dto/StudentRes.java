package com.example.springboot.dto;

import lombok.Data;
import org.bson.types.ObjectId;


@Data
public class StudentRes {
    private String student_id;

    private String studentName;

    private String studentCode;
}
