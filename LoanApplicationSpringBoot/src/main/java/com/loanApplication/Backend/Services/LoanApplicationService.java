package com.loanApplication.Backend.Services;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.loanApplication.Backend.Model.EmiModel;
import com.loanApplication.Backend.Model.LoanModel;
import com.loanApplication.Backend.Model.RegisterCustomerModel;
import com.loanApplication.Backend.Repository.EmiRepository;
import com.loanApplication.Backend.Repository.LoanApplicationRepository;
import com.loanApplication.Backend.Repository.LoanRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class LoanApplicationService {
	
	@Autowired
	LoanRepository loanRepository;
	@Autowired
	EmiRepository emiRepository;
	@Autowired
	LoanApplicationRepository loanApplicationRepository;
	private static final Logger logger = LoggerFactory.getLogger(LoanApplicationService.class);

	
	public RegisterCustomerModel saveCustomerDetails(RegisterCustomerModel customer) {
		// TODO Auto-generated method stub
		customer.setCustomerId(generateKey("customerId"));
		return loanApplicationRepository.save(customer);

	}
	
	private String generateKey(String prefix) {
		// TODO Auto-generated method stub
		String key = UUID.randomUUID().toString().split("-")[0];
		return prefix+ key;
	}
	public RegisterCustomerModel getCustomerDetails(String customerId) {
		// TODO Auto-generated method stub
		logger.info("customer details", customerId);
		return loanApplicationRepository.findById(customerId).get();
	}

	
	public RegisterCustomerModel getCustomerDetails(String email, String password) {
		// TODO Auto-generated method stub
		List<RegisterCustomerModel> customerList = loanApplicationRepository.findByEmailAndPassword(email, password);
		if (customerList.isEmpty()) {
			return new RegisterCustomerModel();
		}
		logger.info("Customer Details", email);
		return loanApplicationRepository.findByEmailAndPassword(email, password).get(0);
	}

	public LoanModel approvedLoan(String loanId) {
		// TODO Auto-generated method stub
		Optional<LoanModel> loanapprovedOptional = loanRepository.findById(loanId);
		LoanModel loan = new LoanModel();
		if (loanapprovedOptional.isPresent()) {
			loan = loanapprovedOptional.get();
			loan.setPayment(true);
		}
		logger.info("Loan is Approved", loanId);
		return loanRepository.save(loan);
	}

	public LoanModel saveLoan(LoanModel loanModel) throws CloneNotSupportedException {
		// TODO Auto-generated method stub
		loanModel.setInterestExtimate(10);
		loanModel.setPayment(false);
		loanModel.setLoanId(generateKey("loanId"));
		createPaymentSchedule((LoanModel)loanModel);
		logger.info("Loan Applied", loanModel);
		return loanRepository.save(loanModel);

	}
	
	private void createPaymentSchedule(LoanModel loan) {
		String paymentTerm = loan.getPaymentTerm();
		if (paymentTerm.equals("Interest Only")) {
			createInterestOnlySchedule(loan);
		} else if (paymentTerm.equals("Even Principal")) {
			createEvenPrincipalSchedule(loan);
		}
	}

	private void createEvenPrincipalSchedule(LoanModel loan) {
		List<EmiModel> paymentScheduleList = new ArrayList<EmiModel>();
		int perPaymentPrincipal = loan.getLoanAmount() / loan.getPayments();
		for (int i = 1; i <= loan.getPayments(); i++) {
			EmiModel paymentSchedule = new EmiModel();
			paymentSchedule.setPaymentId(generateKey("PAY"));
			paymentSchedule.setLoanId(loan.getLoanId());
			paymentSchedule.setPaymentDate(calculatePaymentDate(loan, loan.getPaymentInterval()));
			paymentSchedule.setPrincipalAmount(loan.getLoanAmount());
			paymentSchedule.setInterestExtimate(calculateInterest(loan,perPaymentPrincipal));
			paymentSchedule.setPaymentStatus("PROJECTED");
			paymentSchedule.setPaymentAmount(paymentSchedule.getInterestExtimate()+perPaymentPrincipal);
			paymentScheduleList.add(paymentSchedule);
		}
		logger.info("Creating Even Principal Schedule for Loan {}", loan);
		emiRepository.saveAll(paymentScheduleList);
	}

	private void createInterestOnlySchedule(LoanModel loan) {
		List<EmiModel> paymentScheduleList = new ArrayList<EmiModel>();
		int netPrincipal = loan.getLoanAmount();
		int perPaymentPrincipal = loan.getLoanAmount() / loan.getPayments();
		for (int i = 1; i <= loan.getPayments(); i++) {
			EmiModel paymentSchedule = new EmiModel();
			paymentSchedule.setPaymentId(generateKey("PAY"));
			paymentSchedule.setLoanId(loan.getLoanId());
			paymentSchedule.setPaymentDate(calculatePaymentDate(loan, loan.getPaymentInterval()));
			paymentSchedule.setInterestExtimate(calculateInterest(loan,perPaymentPrincipal));
			if(i==loan.getPayments()) {
				paymentSchedule.setPrincipalAmount(netPrincipal);
				paymentSchedule.setPaymentAmount((paymentSchedule.getInterestExtimate())+(netPrincipal));
			}else {
				paymentSchedule.setPrincipalAmount(0);
				paymentSchedule.setPaymentAmount(paymentSchedule.getInterestExtimate());
			}
			paymentSchedule.setPaymentStatus("PROJECTED");
			paymentScheduleList.add(paymentSchedule);
		}
		logger.info("Creating Interest Only  Schedule for Loan {}", loan);
		emiRepository.saveAll(paymentScheduleList);
	}

	
	private float calculateInterest(LoanModel loan, int perPaymentPrincipal) {
		float paymentSchedule = loan.getPayments();
		float principal = loan.getLoanAmount();
		float years = loan.getLoanDuration();
		float interestRate = loan.getRateOfInterest();
		int interestAmount =(int) ((principal * (years / paymentSchedule) * interestRate) / 100);
		principal = principal - perPaymentPrincipal;
		loan.setLoanAmount((int)principal);
		return interestAmount;
	}

	
	private String calculatePaymentDate(LoanModel loan, String paymentInterval) {
		// TODO Auto-generated method stub
		String paymentDate = null;
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
		Date date = null;
		try {
			date = formatter.parse(loan.getStartDate());
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}

		Calendar paymentDateCalenar = Calendar.getInstance();
		paymentDateCalenar.setTime(date);
		switch (paymentInterval) {
		case "Monthly": {
			paymentDateCalenar.add(Calendar.MONTH, 1);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}
		case "Half Yearly": {
			paymentDateCalenar.add(Calendar.MONTH, 6);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}
		case "Yearly": {
			paymentDateCalenar.add(Calendar.MONTH, 12);
			paymentDate = "" + paymentDateCalenar.get(Calendar.DATE) + "-"
					+ (paymentDateCalenar.get(Calendar.MONTH) + 1) + "-" + paymentDateCalenar.get(Calendar.YEAR);
			break;
		}

		}
		paymentDate = convertDateFormat(paymentDate);
		loan.setStartDate(paymentDate);
		return paymentDate;
	}

	
	private String convertDateFormat(String paymentDate) {
		// TODO Auto-generated method stub
		if (paymentDate.charAt(1) == '-') {
			paymentDate = "0" + paymentDate;
		}
		if (paymentDate.charAt(4) == '-') {
			paymentDate = paymentDate.substring(0, 3) + "0" + paymentDate.substring(3);
		}
		return paymentDate;
	}

	public LoanModel getLoanDetailsForPayment(String loanId) {
		logger.info("Get loan details", loanId);
		return loanRepository.findById(loanId).get();
	}
	
	public List<EmiModel> getPaymentScheduleByLoanId(String loanId) {
		logger.info("Getting Payment Schedule for Loan{}", loanId);
		return EmiRepository.findByLoanId(loanId);
	}


	public List<LoanModel> getLoansByCustomerId(String customerId) {
		// TODO Auto-generated method stub
			List<LoanModel> loans = new ArrayList<LoanModel>();
			loanRepository.findByCustomerId(customerId).forEach(loan -> loans.add(loan));
			logger.info("Getting loan details for existing customer {}", customerId);
			return loans;
	}



	}