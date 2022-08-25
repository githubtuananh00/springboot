package com.example.springboot.service;

import com.example.springboot.module.Student;

public interface StudentService {
    Student saveStudent(Student student);
    Student findByStudentName(String studentName);
}
