package com.loanApplication.Backend.Model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table
public class LoanModel implements Cloneable{
	@Id
	@Column
	private String loanId;
	@Column
	private String customerId;
	@Column
	private int loanAmount;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date loanDate;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date startDate;
	@Column
	@JsonFormat(pattern="yyyy-MM-dd")
	private Date endDate;
	@Column
	private int loanDuration;
	@Column
	private String paymentInterval;
	@Column
	private int payments;
	@Column
	private float rateOfInterest;
	private String paymentTerm;
	@Column
	private int interestExtimate;
	@Column
	private boolean payment;
	
	
	public String getLoanId() {
		return loanId;
	}
	
	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}
	
	public String getCustomerId() {
		return customerId;
	}
	
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	public int getLoanAmount() {
		return loanAmount;
	}
	
	public void setLoanAmount(int loanAmount) {
		this.loanAmount = loanAmount;
	}
	
	public Date getLoanDate() {
		return loanDate;
	}
	
	public void setLoanDate(Date loanDate) {
		this.loanDate = loanDate;
	}
	
	public Date getStartDate() {
		return startDate;
	}
	
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	
	public Date getEndDate() {
		return endDate;
	}
	
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public int getLoanDuration() {
		return loanDuration;
	}
	
	public void setLoanDuration(int loanDuration) {
		this.loanDuration = loanDuration;
	}
	
	public String getPaymentInterval() {
		return paymentInterval;
	}
	
	public void setPaymentInterval(String paymentInterval) {
		this.paymentInterval = paymentInterval;
	}
	
	public int getPayments() {
		return payments;
	}
	
	public void setPayments(int payments) {
		this.payments = payments;
	}
	
	public float getRateOfInterest() {
		return rateOfInterest;
	}
	
	public void setRateOfInterest(float rateOfInterest) {
		this.rateOfInterest = rateOfInterest;
	}
	
	public String getPaymentTerm() {
		return paymentTerm;
	}
	public void setPaymentTerm(String paymentTerm) {
		this.paymentTerm = paymentTerm;
	}
	
	public int getInterestExtimate() {
		return interestExtimate;
	}
	
	public void setInterestExtimate(int interestExtimate) {
		this.interestExtimate = interestExtimate;
	}
	
	public boolean isPayment() {
		return payment;
	}
	
	public void setPayment(boolean payment) {
		this.payment = payment;
	}
	
	public Object clone() throws CloneNotSupportedException
    {
        return super.clone();
    }

}
