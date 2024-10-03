import { redirect } from 'next/navigation';
import axios, { AxiosError } from 'axios';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Ocurrió un error inesperado',
      };
    } else {
      return {
        success: false,
        message: 'Algo salió mal. Intenta de nuevo.',
      };
    }
  }
};

export const register = async (
  fullName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        fullName,
        email,
        password,
      },
      { withCredentials: true }
    );

    return { success: true };
  } catch (error) {
    console.error(error);
    if (error instanceof AxiosError && error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Ocurrió un error inesperado',
      };
    } else {
      return {
        success: false,
        message: 'Algo salió mal. Intenta de nuevo.',
      };
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(
      'http://localhost:5000/api/auth/logout',
      {},
      {
        withCredentials: true,
      }
    );
    redirect('/login');
  } catch (error) {
    console.error(error);
  }
};
