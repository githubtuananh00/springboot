package com.example.springboot.service.dto;

import com.example.springboot.dto.StudentRequest;
import com.example.springboot.dto.StudentResponse;
import com.example.springboot.module.Student_info;
import org.bson.types.ObjectId;

import java.util.List;

public interface StudentDtoService {
    List<StudentResponse> getAllStudent();
    List<StudentResponse> searchStudent(StudentRequest studentRequest);
    StudentResponse getAStudent(ObjectId id) throws Exception;
    Student_info updateStudentInfo(ObjectId id, StudentRequest studentRequest) throws Exception;

}
