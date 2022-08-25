package com.example.springboot.dto;

import com.example.springboot.module.Student;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;

@Data
public class StudentResponse {
    private String studentName;
    private String studentCode;
    private String studentAddress;
    private LocalDate dateOfBirth;
    private Double averageScore;
    private String student_id;
    private String infoId;
}
