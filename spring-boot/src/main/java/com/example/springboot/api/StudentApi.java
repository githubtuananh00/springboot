package com.example.springboot.api;

import com.example.springboot.Repo.StudentInfoRepository;
import com.example.springboot.dto.StudentRequest;
import com.example.springboot.dto.StudentRes;
import com.example.springboot.dto.StudentResponse;
import com.example.springboot.module.ResponseObj;
import com.example.springboot.module.Student;
import com.example.springboot.module.Student_info;
//import com.example.springboot.module.dto.StudentRequest;
//import com.example.springboot.module.dto.StudentResponse;
import com.example.springboot.service.StudentInfoService;
import com.example.springboot.service.StudentService;
//import com.example.springboot.service.dto.StudentDtoService;
import com.example.springboot.service.dto.StudentDtoService;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(path = "/student")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class StudentApi {
    private final StudentService studentService;

    private final StudentInfoService studentInfoService;
    private final StudentDtoService studentDtoService;

    private final StudentInfoRepository studentInfoRepository;

    @PostMapping(path = "/addStudent")
    public ResponseEntity<ResponseObj> addStudent(@RequestBody Student student) {
//        Student student1 = studentService.findByStudentName(student.getStudentName());
//        if (student1!=null){
//            return ResponseEntity.status(403).body(
//                    new ResponseObj(false,"Student Name already exists")
//            )
//        }
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("student/addStudent").toUriString());
        student.setStudentCode(randomStudentCode());
        Student student1 = studentService.saveStudent(student);
        StudentRes studentRes = new StudentRes();
        studentRes.setStudent_id(student1.getStudent_id().toString());
        studentRes.setStudentName(student1.getStudentName());
        studentRes.setStudentCode(student1.getStudentCode());

        return ResponseEntity.created(uri).body( new ResponseObj(true,"Save student to the database successfully",studentRes) );
    }

    private String randomStudentCode() {
        String random = "STU";
        int randomNum = (int) (Math.random() * 1001);
        if (randomNum < 100)
            random += "0" + randomNum;
        else
            random += "" + randomNum;
        return random;
    }

    @PostMapping(path = "/addStudentInfo")
    public ResponseEntity<ResponseObj> addStudentInfo(@RequestBody Student_info studentInfo) {
        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("student/addStudentInfo").toUriString());

        return ResponseEntity.created(uri).body( new ResponseObj(true,"Save Student info to the database successfully",studentInfoService.saveStudent_info(studentInfo)) );
    }

//    @GetMapping(path = "/all")
//    public ResponseEntity<List<StudentResponse>> getAllUser() {
//        return ResponseEntity.ok().body( studentDtoService.getAllStudent());
//    }
    @GetMapping(path = "/all")
    public ResponseEntity<ResponseObj> getAllUser() {
        return ResponseEntity.ok().body( new ResponseObj(true,"Get all student",studentDtoService.getAllStudent()) );
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<ResponseObj> getAStudent(@PathVariable ObjectId id) throws Exception {
        return ResponseEntity.ok().body(new ResponseObj(true,"Get a student",studentDtoService.getAStudent(id)));
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<ResponseObj> updateStudent(@RequestBody StudentRequest studentRequest, @PathVariable ObjectId id) throws Exception {
//        studentInfoService.updateStudentInfo(id, student_info);
       return ResponseEntity.ok().body(new ResponseObj(true,"Edit Student Success fully",studentDtoService.updateStudentInfo(id,studentRequest))) ;
    }

    @DeleteMapping(path = "/delete/{id}")
    public ResponseEntity<ResponseObj> deleteStudentInfo(@PathVariable ObjectId id) throws Exception {
//
        studentInfoService.deleteStudentInfoById(id);
        return ResponseEntity.ok().body(new ResponseObj(true,"Delete Student Info Successfully",null));
    }

//
    @PostMapping(path = "/search")
    public ResponseEntity<ResponseObj> searchStudent(@RequestBody StudentRequest studentRequest) {
        return ResponseEntity.ok().body(
                new ResponseObj(true,"Find Student Successfully",studentDtoService.searchStudent(studentRequest))
        );
    }

}
