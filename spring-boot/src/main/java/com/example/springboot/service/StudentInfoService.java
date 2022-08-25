package com.example.springboot.service;

import com.example.springboot.module.Student_info;
import org.bson.types.ObjectId;

import java.util.List;

public interface StudentInfoService {
    Student_info saveStudent_info(Student_info student_info);
    List<Student_info> getAllStudentInfo();

    void updateStudentInfo(ObjectId id, Student_info student_info) throws Exception;

    void deleteStudentInfoById(ObjectId id) throws Exception;
//Student_info test();
}
