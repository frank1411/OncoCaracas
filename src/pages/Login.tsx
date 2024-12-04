import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm, AuthFormData } from '../components/auth/AuthForm';
import { signIn } from '../services/auth';
import { useAuthStore } from '../store/authStore';

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const setUser = useAuthStore(state => state.setUser);

  const handleSubmit = async (data: AuthFormData) => {
    try {
      setIsLoading(true);
      const user = await signIn(data.email, data.password);
      setUser(user);
      navigate('/courses');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <AuthForm mode="login" onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}