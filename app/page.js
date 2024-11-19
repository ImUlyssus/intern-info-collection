"use client";

import { useState } from "react";
import Image from "next/image";
import internshipPic from "../public/images/Internship.jpg";
import PersonalInformationForm from "./components/PersonalInformationForm";
import InternshipInformationForm from "./components/InternshipInformationForm";
import AdditionalInformationForm from "./components/AdditionalInformationForm";
import { CustomDialog } from "./components/CustomDialog";

export default function Home() {
  const [activeSection, setActiveSection] = useState(1);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phone: "",
    email: "",
    university: "",
    linkedin: "",
    portfolio: "",
    startDate: "",
    endDate: "",
    position: "",
    languages: "",
    hobbies: "",
    additionalComments: "",
    salary: "",
    workingCondition: "",
    location: "",
  });

  const inputStyle = {
    width: "100%",
    padding: ".5rem",
    border: "1px solid #000",
    borderRadius: "8px",
    outline: "none",
    fontSize: "1rem",
  };

  const handleNext = () => {
    if (activeSection < 3) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 1) {
      setActiveSection(activeSection - 1);
    }
  };

  const [errors, setErrors] = useState({
    firstName: "",
  lastName: "",
  phone: "",
  email: "",
  university: "",
  linkedin: "",
  portfolio: "",
  middleName: "",
    startDate: "",
    endDate: "",
    position: "",
    salary: "",
    workingCondition: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Reset the error for the specific field when the user types
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let formErrors = {};
    const requiredFields = [
      "firstName", "lastName", "phone", "email", "university", "linkedin", 
      "startDate", "endDate", "position", "salary", "workingCondition", "location"
    ];
  
    // Loop through each required field and check if it's empty
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        formErrors[field] = `${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`;
      }
    });
  
    setErrors(formErrors);
  
    if (Object.keys(formErrors).length > 0) {
      let errorMessage = "Please fill out the following required fields:\n";
      for (let field in formErrors) {
        errorMessage += `- ${formErrors[field]}\n`;
      }
  
      // Split the message by line breaks and join with <br /> for HTML rendering
      const formattedMessage = errorMessage.split('\n').map((line, index) => (
        <span key={index}>
          {line}
          <br />
        </span>
      ));
  
      setDialogMessage(formattedMessage);
      setShowDialog(true);
      return false; // Return false if there are any errors
    }
  
    return true; // Return true if no errors
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission logic if all required fields are filled
      console.log("Form submitted:", formData);
    }
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const renderFormSection = () => {
    switch (activeSection) {
      case 1:
        return <PersonalInformationForm formData={formData} handleChange={handleChange} inputStyle={inputStyle} />;
      case 2:
        return <InternshipInformationForm formData={formData} handleChange={handleChange} inputStyle={inputStyle} errors={errors} />;
      case 3:
        return <AdditionalInformationForm formData={formData} handleChange={handleChange} inputStyle={inputStyle} />;
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#fff",
        color: "#000",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Image Column */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRight: "1px solid #ccc",
        }}
      >
        <Image src={internshipPic} alt="Internship" width="auto" height="auto" />
      </div>

      {/* Right Column */}
      <div style={{ flex: 2, padding: "2rem" }}>
        {/* Circle Icons */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          {[1, 2, 3].map((section) => (
            <div
              key={section}
              onClick={() => setActiveSection(section)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: activeSection === section ? "#000" : "#ccc",
                color: activeSection === section ? "#fff" : "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                margin: "0 10px",
                fontWeight: "bold",
              }}
            >
              {section}
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div>{renderFormSection()}</div>

        {/* Navigation Buttons */}
        <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
          {activeSection > 1 && (
            <button type="button" onClick={handlePrevious} style={buttonStyle}>
              Previous
            </button>
          )}
          {activeSection < 3 ? (
            <button type="button" onClick={handleNext} style={buttonStyle}>
              Next
            </button>
          ) : (
            <button type="submit" onClick={handleSubmit} style={buttonStyle}>
              Submit
            </button>
          )}
        </div>
      </div>
      {showDialog && <CustomDialog message={dialogMessage} onClose={handleDialogClose} />}
    </div>
  );
}

// Button Style
const buttonStyle = {
  padding: ".75rem 2rem",
  backgroundColor: "#000",
  color: "#fff",
  border: "none",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "1rem",
};


