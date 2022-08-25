package com.example.springboot.service.dto;

import com.example.springboot.Repo.StudentInfoRepository;
import com.example.springboot.Repo.StudentRepository;
import com.example.springboot.module.Student;
import com.example.springboot.module.Student_info;
import com.example.springboot.dto.StudentRequest;
import com.example.springboot.dto.StudentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class StudentDtoServiceImpl implements StudentDtoService{
    private final StudentInfoRepository studentInfoRepository;
    private final StudentRepository studentRepository;

    private final MongoTemplate mongoTemplate;



    @Override
    public List<StudentResponse> searchStudent(StudentRequest studentRequest) {
        Student studentName = studentRepository.findByStudentName(studentRequest.getStudentName());
        Student studentCode = studentRepository.findByStudentCode(studentRequest.getStudentCode());
        List<Student_info> student_info = studentInfoRepository.findByStudent(studentCode);


        if(studentRequest.getStudentCode()!=null && studentRequest.getStudentName()!=null){
            if (studentCode.equals(studentName)){
                return student_info.stream().map(this::convertEntityToDTO)
                        .collect(Collectors.toList());
            }else return null;


        }

      if (studentCode!=null )
          return student_info.stream().map(this::convertEntityToDTO)
                  .collect(Collectors.toList());
//      else {
//          return null;
//      }
      if (studentName!=null)
          return studentInfoRepository.findByStudent(studentName).stream().map(this::convertEntityToDTO)
                  .collect(Collectors.toList());



//
        return studentInfoRepository.findByAllStudent(
                studentRequest.getDateOfBirth())

//                studentRequest.getStudentName(),
//                studentRequest.getStudentCode());
                .stream().map(this::convertEntityToDTO)
                .collect(Collectors.toList());
    }



    @Override
    public StudentResponse getAStudent(ObjectId id) throws Exception {

        Student_info student_info = studentInfoRepository.findById(id).orElseThrow(()->new Exception("Not found student"));
        StudentResponse studentResponse=new StudentResponse();
        studentResponse.setStudentName(student_info.getStudent().getStudentName());
        studentResponse.setStudentAddress(student_info.getStudentAddress());
        studentResponse.setAverageScore(student_info.getAverageScore());
        studentResponse.setStudentCode(student_info.getStudent().getStudentCode());
        studentResponse.setDateOfBirth(student_info.getDateOfBirth());
        studentResponse.setStudent_id(student_info.getStudent().getStudent_id().toString());
        studentResponse.setInfoId(student_info.getInfoId().toString());
        return studentResponse;
    }

    @Override
    public Student_info updateStudentInfo(ObjectId id, StudentRequest studentRequest) throws Exception {
        Student_info student_info= studentInfoRepository.findById(id).orElseThrow(()->new Exception("Not found Student Info"));
        Student student = studentRepository.findById(studentRequest.getStudent_id()).orElseThrow(()->new Exception("Not found Student"));
        student.setStudentName(studentRequest.getStudentName());
        student_info.setStudentAddress(studentRequest.getStudentAddress());
        student_info.setAverageScore(studentRequest.getAverageScore());
        student_info.setDateOfBirth(studentRequest.getDateOfBirth());
        student_info.setStudent(student);
        studentInfoRepository.save(student_info);
        studentRepository.save(student);
//        studentInfoRepository.findOne();
        return student_info;
    }

    @Override
    public List<StudentResponse> getAllStudent() {
        log.info("Get all Student Info");

        return studentInfoRepository.findAll().stream().map(this::convertEntityToDTO).collect(Collectors.toList());
//
    }

    private StudentResponse convertEntityToDTO(Student_info student_info){
        StudentResponse studentResponse = new StudentResponse();
        studentResponse.setStudentName(student_info.getStudent().getStudentName());
        studentResponse.setStudentAddress(student_info.getStudentAddress());
        studentResponse.setAverageScore(student_info.getAverageScore());
        studentResponse.setStudentCode(student_info.getStudent().getStudentCode());
        studentResponse.setDateOfBirth(student_info.getDateOfBirth());
        studentResponse.setStudent_id(student_info.getStudent().getStudent_id().toString());
        studentResponse.setInfoId(student_info.getInfoId().toString());
        return studentResponse;
    }


//
}
