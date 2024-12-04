import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User as UserIcon } from 'lucide-react';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">LearnHub</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link to="/courses" className="text-gray-700 hover:text-gray-900">
                Courses
              </Link>
              <Link to="/profile" className="flex items-center text-gray-700 hover:text-gray-900">
                <UserIcon className="w-5 h-5 mr-1" />
                Profile
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-gray-900">
                  Admin
                </Link>
              )}
              <button className="flex items-center text-gray-700 hover:text-gray-900">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-gray-900">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}