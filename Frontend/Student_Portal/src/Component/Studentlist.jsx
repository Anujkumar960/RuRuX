import React from 'react';

const StudentListPage = () => {
  // Sample student data (replace this with your actual data)
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', grade: 'A' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', grade: 'B' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', grade: 'C' },
    // Add more students as needed
  ];

  return (
    <div>
      <h1>Student List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentListPage;
