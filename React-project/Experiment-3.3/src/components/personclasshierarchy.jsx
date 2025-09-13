import React from "react";

// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, course) {
    super(name, age);
    this.course = course;
  }

  displayInfo() {
    return `${super.displayInfo()}, Course: ${this.course}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

// React Component
const PersonHierarchy = () => {
  const student1 = new Student("Gautam", 20, "Mathematics");
  const teacher1 = new Teacher("Mr.Harbinder Singh", 40, "Full Stack");

  const boxStyle = {
    border: "2px solid #4CAF50",
    borderRadius: "10px",
    padding: "20px",
    margin: "10px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    boxShadow: "2px 2px 10px rgba(0,0,0,0.1)",
    color: "black", // Text inside boxes is black
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  };

  const headingStyle = {
    textAlign: "center",
    color: "white", // Main heading in white
    backgroundColor: "#232323ff", // Optional background to make white text visible
    padding: "10px",
    borderRadius: "5px",
  };

  return (
    <div style={{ fontFamily: "Arial", color: "black" }}>
      <h1 style={headingStyle}>Person Class Hierarchy</h1>
      <div style={containerStyle}>
        <div style={boxStyle}>
          <h2 style={{ color: "black" }}>Student</h2>
          <p>{student1.displayInfo()}</p>
        </div>
        <div style={boxStyle}>
          <h2 style={{ color: "black" }}>Teacher</h2>
          <p>{teacher1.displayInfo()}</p>
        </div>
      </div>
    </div>
  );
};

export default PersonHierarchy;
