package com.example.springboot.service;

import com.example.springboot.Repo.StudentInfoRepository;
import com.example.springboot.Repo.StudentRepository;
import com.example.springboot.module.Student_info;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StudentInfoServiceImpl implements StudentInfoService {
    private final StudentInfoRepository studentInfoRepository;
    private final StudentRepository studentRepository;

    @Override
    public Student_info saveStudent_info(Student_info student_info) {
        log.info("Saving new Student Info {} to the database", student_info);
        return studentInfoRepository.save(student_info);
    }

    @Override
    public List<Student_info> getAllStudentInfo() {
        log.info("Get all Student Info");
        return studentInfoRepository.findAll();
    }

    @Override
    public void updateStudentInfo(ObjectId id, Student_info student_info) throws Exception {
       Student_info student= studentInfoRepository.findById(id).orElseThrow(()-> new Exception("123"));
       log.info("Update Student Successfully");
       student.setStudentAddress(student_info.getStudentAddress());
       student.setAverageScore(student_info.getAverageScore());
       student.setDateOfBirth(student_info.getDateOfBirth());
       studentInfoRepository.save(student);
    }

    @Override
    public void deleteStudentInfoById(ObjectId id) throws Exception {
        log.info("Delete a Student successfully");
        Student_info student_info = studentInfoRepository.findById(id).orElseThrow(()->new Exception("Not found Student Id"));
        ObjectId studentId = student_info.getStudent().getStudent_id();
        studentRepository.deleteById(studentId);
        studentInfoRepository.deleteById(id);
    }

}
