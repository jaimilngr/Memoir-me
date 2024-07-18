import { useNavigate } from 'react-router-dom';

export const useSignOut  = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/signin'); 
  };

  return handleSignOut;
};