 package com.loanApplication.Backend.Repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.loanApplication.Backend.Model.RegisterCustomerModel;

public interface LoanApplicationRepository extends CrudRepository<RegisterCustomerModel, String>{
	List<RegisterCustomerModel> findByEmailAndPassword(String email, String password);

}
