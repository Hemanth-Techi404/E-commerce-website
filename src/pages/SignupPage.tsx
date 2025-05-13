import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import Card from '../components/ui/Card';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleSignupSuccess = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <Card className="max-w-md w-full p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-600 mt-2">Start shopping with us today</p>
        </div>
        
        <SignupForm onSuccess={handleSignupSuccess} />
        
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            By creating an account, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800">
              Privacy Policy
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;