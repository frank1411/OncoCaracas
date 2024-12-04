import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm, AuthFormData } from '../components/auth/AuthForm';
import { createUser } from '../services/auth';
import { useAuthStore } from '../store/authStore';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (data: AuthFormData) => {
    if (!data.name) return;
    
    try {
      setIsLoading(true);
      const user = await createUser(data.email, data.password, data.name);
      setUser(user);
      navigate('/courses');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al crear la cuenta. Por favor, intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm mode="register" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}