package com.dinesh.www.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.dinesh.www.exception.ResourceNotFoundException;
import com.dinesh.www.model.Employee;
import com.dinesh.www.repo.EmployeeRepository;

@Service
public class EmployeeService {

	@Autowired
	EmployeeRepository employeeRepository;
	
	public List<Employee> getAllEmployees()
	{
		return employeeRepository.findAll();
	}
	
	public Employee createEmployee(Employee employee)
	{
		return employeeRepository.save(employee);
	}
	
	public Employee getEmployeeById(long id)
	{
	    return employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
	}
	
	public ResponseEntity<Employee> updateEmployee(long id,Employee employee)
	{
		Employee oldEmp=employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
		oldEmp.setFirstName(employee.getFirstName());
		oldEmp.setLastName(employee.getLastName());
		oldEmp.setEmail(employee.getEmail());
		
		employeeRepository.save(oldEmp);
		return ResponseEntity.ok(oldEmp);
	}
	
	public ResponseEntity<HttpStatus> deleteEmployee(long id)
	{
		Employee employee=employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Id Not Found"));
		employeeRepository.delete(employee);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
}
