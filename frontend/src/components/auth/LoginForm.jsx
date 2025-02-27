import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API call logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
        required
      />
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;