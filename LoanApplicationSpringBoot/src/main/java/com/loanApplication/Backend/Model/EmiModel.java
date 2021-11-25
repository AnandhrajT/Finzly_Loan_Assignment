package com.loanApplication.Backend.Model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class EmiModel {
	
	@Id
	@Column
	private String paymentId;
	@Column
	private String loanId;
	@Column
	private String paymentDate;
	@Column
	private int principalAmount;
	@Column
	private double interestExtimate;
	@Column
	private String paymentStatus;
	@Column
	private double paymentAmount;
	
	public String getPaymentId() {
		return paymentId;
	}
	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}
	public String getLoanId() {
		return loanId;
	}
	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}
	public String getPaymentDate() {
		return paymentDate;
	}
	public void setPaymentDate(String paymentDate) {
		this.paymentDate = paymentDate;
	}
	public int getPrincipalAmount() {
		return principalAmount;
	}
	public void setPrincipalAmount(int principalAmount) {
		this.principalAmount = principalAmount;
	}
	public double getInterestExtimate() {
		return interestExtimate;
	}
	public void setInterestExtimate(double d) {
		this.interestExtimate = d;
	}
	public String getPaymentStatus() {
		return paymentStatus;
	}
	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}
	public double getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(double d) {
		this.paymentAmount = d;
	}

}
