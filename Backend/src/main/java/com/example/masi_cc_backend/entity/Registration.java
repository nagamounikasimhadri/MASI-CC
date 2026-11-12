package com.example.masi_cc_backend.entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;

@Entity
@Table(name = "registrations")
public class Registration {
   
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;  

  private String firstName;
  private String lastName;
  private String emailId;
  private String telePhone;
  private String addressBook;


  public Long getId() {
    return id;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

   public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getEmailId() {
    return emailId;
  }

  public void setEmailId(String emailId) {
    this.emailId = emailId;
  }

  public String getTelePhone() {
    return telePhone;
  }

  public void setTelePhone(String telePhone) {
    this.telePhone = telePhone;
  }

   public String getAddressBook() {
    return addressBook;
  }

  public void setAddressBook(String addressBook) {
    this.addressBook = addressBook;
  }

}
