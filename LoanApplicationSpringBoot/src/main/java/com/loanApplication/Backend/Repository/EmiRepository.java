package com.loanApplication.Backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.CrudRepository;

import com.loanApplication.Backend.Model.EmiModel;

@EnableJpaRepositories 
public interface EmiRepository extends CrudRepository<EmiModel,String>{
	static List<EmiModel> findByLoanId(String loanId) {
		// TODO Auto-generated method stub
		return null;
	}
}
