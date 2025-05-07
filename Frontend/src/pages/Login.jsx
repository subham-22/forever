import React,{ useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmmitHandler = async (e) => {
    e.preventDefault();
    try {
      const url = `${backendUrl}/api/user/${
        currentState === 'Sign Up' ? 'register' : 'login'
      }`;
      const response = await axios.post(url, {
        name: currentState === 'Sign Up' ? name : undefined,
        email,
        password,
      });
      

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      <div className='w-full px-3 py-2 flex flex-col gap-4'>
        {currentState === 'Sign Up' ? (
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type='text'
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
        ) : ''}

        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />

        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot your password?</p>
          {currentState === 'Login' ? (
            <p
              onClick={() => setCurrentState('Sign Up')}
              className='cursor-pointer'
            >
              Create Account
            </p>
          ) : (
            <p
              onClick={() => setCurrentState('Login')}
              className='cursor-pointer'
            >
              Login Here
            </p>
          )}
        </div>
        <button className='w-1/2 m-auto bg-black  text-white font-light px-8 py-2 mt-4'>
          {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
        </button>
      </div>
    </form>
  );
};

export default Login;
