package com.example.springboot.service;

import com.example.springboot.Repo.StudentRepository;
import com.example.springboot.module.Student;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StudentServiceImpl implements StudentService{
    private final StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        log.info("Saving new Student {} to the database.",student);

        return studentRepository.save(student);
    }

    @Override
    public Student findByStudentName(String studentName) {
        log.info("Found Student Name {}",studentName);
        return studentRepository.findByStudentName(studentName);
    }
}
