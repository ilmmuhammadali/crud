import React, { useState } from 'react';
import './index.css';

function App() {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    employees: [],
    isEditing: false,
    editIndex: null
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;
    setEmployee(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(prevState => ({
      ...prevState,
      [name]: ''
    }));
  }

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!employee.name.trim()) {
      newErrors.name = 'Please enter a name';
      isValid = false;
    }

    if (!employee.email.trim()) {
      newErrors.email = 'Please enter an email';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(employee.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!employee.address.trim()) {
      newErrors.address = 'Please enter an address';
      isValid = false;
    }

    if (!employee.phone.trim()) {
      newErrors.phone = 'Please enter a phone number';
      isValid = false;
    } else if (!/^\d{10}$/.test(employee.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (employee.isEditing) {
      handleUpdate(event);
    } else {
      if (validateForm()) {
        setEmployee(prevState => ({
          ...prevState,
          employees: [...prevState.employees, employee],
          name: '',
          email: '',
          address: '',
          phone: ''
        }));
      }
    }
  }

  function handleUpdate(event) {
    event.preventDefault();
    if (validateForm()) {
      setEmployee(prevState => ({
        ...prevState,
        employees: [...prevState.employees, employee],
        name: '',
        email: '',
        address: '',
        phone: '',
        isEditing: false,
        editIndex: null
      }));
    }
  }

  function handleEdit(index) {
    const editedEmployee = employee.employees[index];
    setEmployee(prevState => ({
      ...prevState,
      name: editedEmployee.name,
      email: editedEmployee.email,
      address: editedEmployee.address,
      phone: editedEmployee.phone,
      employees: prevState.employees.filter((_, i) => i !== index),
      isEditing: true,
      editIndex: index
    }));
  }

  function handleDelete(index) {
    setEmployee(prevState => ({
      ...prevState,
      employees: prevState.employees.filter((_, i) => i !== index)
    }));
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  const filteredEmployees = employee.employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>{employee.isEditing ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.name && <span className="text-danger">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={employee.address}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.address && <span className="text-danger">{errors.address}</span>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.phone && <span className="text-danger">{errors.phone}</span>}
        </div>
        <input
          type="text"
          name="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name"
        />
        <button type="submit" className="btn btn-primary">
          {employee.isEditing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp, index) => (
            <tr key={index}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.address}</td>
              <td>{emp.phone}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info mr-1"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
