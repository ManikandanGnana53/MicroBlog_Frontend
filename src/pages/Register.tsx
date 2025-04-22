import { RegisterProps } from '../types/TYPES';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import Input from '../components/Input';
import Button from '../components/Button';
import AxiosInstance from '../utils/axiosINstance';

function Register() {
  const initialValues: Required<RegisterProps> = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    contact: 0,
  };
  const validationSchema = yup.object({
    firstName: yup.string().required("FirstName is requird"),
    lastName: yup.string().required("LastName is requird"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    contact: yup.string().required("Contact is required").max(10,"Contact number should 10 digits"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const submit = (values: { firstName: string, lastName: string, email: string; password: string, contact: number; }) => {
    const { firstName, lastName, email, contact, password } = values;
    const data = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
      contact: contact,
    };
    AxiosInstance.post('api/v1/register', data)
      .then(() => alert('USER REGISTERED'))
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-lime-100 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-xl p-8 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-200 via-teal-200 to-lime-200 opacity-30 rounded-xl blur-xl -z-10"
        ></div>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Create Account</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
          <Form>
            <div className="mb-4">
              <Input label="Firstname" placeholder="FirstName" name="firstName" />
            </div>
            <div className="mb-4">
              <Input label="LastName" placeholder="LastName" name="lastName" />
            </div>
            <div className="mb-4">
              <Input label="Email" placeholder="Email" name="email" type='email' />
            </div>
            <div className="mb-6">
              <Input label="Password" placeholder="••••••••" name="password" type="password" />
            </div>
            <div className="mb-6">
              <Input label="Contact" placeholder="••••••••" name="contact" />
            </div>

            <Button
              text="Register"
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md shadow-md py-3 transition duration-200 ease-in-out"
            />
          </Form>
        </Formik>

        <p className="text-center text-sm mt-6 text-gray-600">
          Already have an account?{' '}
          <a href="/" className="text-green-600 hover:underline font-medium">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;