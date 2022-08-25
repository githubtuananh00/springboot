package com.example.springboot.Repo;

import com.example.springboot.module.Student;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StudentRepository extends MongoRepository<Student, ObjectId> {
    Student findByStudentCode(String studentCode);
    Student findByStudentName(String studentName);
}
