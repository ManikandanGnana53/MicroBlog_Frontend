import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../components/Input'; // Assuming your Input component handles labels
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { login } from '../features/AuthSlice';
import { LoginTypes } from '../types/TYPES';
import * as yup from 'yup';
import AxiosInstance from '../utils/axiosINstance';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const disPatch = useDispatch();
  const navigate = useNavigate()
  const initialValues: Required<LoginTypes> = {
    email: '',
    password: '',
    accessToken: '',
  };
  const validationSchema = yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  });
  const handleLogin = (values: { email: string; password: string; accessToken: string }) => {
    const data = {
      email: values.email,
      password: values.password
    }
    AxiosInstance.post("api/v1/login", data)
      .then((res) => {
        navigate('/Blogsview')
        disPatch(login(res.data));
        localStorage.setItem("accessToken", res.data.accessToken)
      }
      )
      .catch((res) => console.log(res))
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-xl p-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 opacity-30 rounded-xl blur-xl -z-10"
        ></div>

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Welcome </h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
          <Form>
            <div className="mb-4"> {/* Added a wrapping div for spacing */}
              <Input name="email" label="Email" placeholder="you@example.com" type="email" />
            </div>
            <div className="mb-6"> {/* Added a wrapping div for spacing */}
              <Input name="password" label="Password" placeholder="••••••••" type="password" />
            </div>

            <Button
              text="Login"
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md py-3 transition duration-200 ease-in-out"
            />
          </Form>
        </Formik>

        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;