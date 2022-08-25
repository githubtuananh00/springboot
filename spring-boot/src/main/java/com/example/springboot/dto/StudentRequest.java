package com.example.springboot.dto;

import lombok.Data;
import org.bson.types.ObjectId;

import java.time.LocalDate;
//import java.util.Objects;

@Data

public class StudentRequest {
    private String studentName;
    private String studentCode;
    private String studentAddress;
    private LocalDate dateOfBirth;
    private Double averageScore;
    private ObjectId student_id;
}
