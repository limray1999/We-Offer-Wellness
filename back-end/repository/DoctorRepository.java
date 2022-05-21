package com.example.advancedprojdb.repository;

import com.example.advancedprojdb.entity.Employee;
import com.example.advancedprojdb.entity.Hospital;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends EmployeeRepository{
    List<Employee> findByLastName(String lastName);

    List<Employee> findByHospital(Hospital hospital);

    List<Employee> findByFirstName(String firstName);
}
