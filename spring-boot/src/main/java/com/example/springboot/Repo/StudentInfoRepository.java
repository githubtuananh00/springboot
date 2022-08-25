package com.example.springboot.Repo;

import com.example.springboot.module.Student;
import com.example.springboot.module.Student_info;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface StudentInfoRepository extends MongoRepository<Student_info, ObjectId> {
    @Query("{'dateOfBirth':?0}")
    List<Student_info> findByAllStudent (LocalDate dateOfBirth);
    List<Student_info> findByStudent(Student student);
}
