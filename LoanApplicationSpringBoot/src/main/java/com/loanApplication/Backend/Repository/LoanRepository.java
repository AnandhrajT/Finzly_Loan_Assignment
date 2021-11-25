package com.loanApplication.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;

import com.loanApplication.Backend.Model.LoanModel;

@EnableJpaRepositories
public interface LoanRepository extends CrudRepository<LoanModel ,String>{

	public List<LoanModel> findByCustomerId(String customerId);
}