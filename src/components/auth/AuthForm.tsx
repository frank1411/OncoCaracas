import React from 'react';
import { useForm } from 'react-hook-form';
import { User } from 'lucide-react';
import { Button } from '../ui/Button';
import { emailRegex, passwordValidation } from '../../utils/validation';

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void;
  isLoading: boolean;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}

export function AuthForm({ mode, onSubmit, isLoading }: AuthFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>();

  return (
    <div className="min-h-[400px] w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
      <div className="flex justify-center mb-6">
        <div className="p-3 bg-blue-100 rounded-full">
          <User className="w-6 h-6 text-blue-600" />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
        {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {mode === 'register' && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              {...register('name', { required: 'El nombre es requerido' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'El email es requerido',
              pattern: {
                value: emailRegex,
                message: 'Email inválido'
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            {...register('password', { 
              required: 'La contraseña es requerida',
              minLength: passwordValidation
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full"
        >
          {mode === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
        </Button>
      </form>
    </div>
  );
}