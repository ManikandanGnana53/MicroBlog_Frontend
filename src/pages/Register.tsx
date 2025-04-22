import { RegisterProps } from '../types/TYPES';
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import Input from '../components/Input';
import Button from '../components/Button';
import AxiosInstance from '../utils/axiosINstance';

function Register() {
  const initialValues: RegisterProps = {
    email: '',
    address: '',
    pincode: 0,
    password: '',
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    address: yup.string().required("Address is required"),
    pincode: yup.string().required("Pincode is required").matches(/^[0-9]{6}$/, 'Pincode must be a 6-digit number'),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
  const submit = (values: { email: string; address: string; pincode: number; password: string }) => {
    const { email, address, pincode, password } = values;
    const data = {
      email: email,
      address: address,
      picode: pincode,
      password: password,
    };
    AxiosInstance.post('/register', data)
      .then(() => alert('USER REGISTERED'))
      .catch((err) => console.log(err));
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-teal-100 to-lime-100 flex items-center justify-center">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-xl p-8 overflow-hidden">
        {/* Transparent Background Design */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-green-200 via-teal-200 to-lime-200 opacity-30 rounded-xl blur-xl -z-10"
        ></div>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Create Account</h2>

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
          <Form>
            <div className="mb-4">
              <Input label="Email" placeholder="you@example.com" name="email" type="email" />
            </div>
            <div className="mb-4">
              <Input label="Address" placeholder="Your Address" name="address" />
            </div>
            <div className="mb-4">
              <Input label="Pincode" placeholder="6-digit Pincode" name="pincode" />
            </div>
            <div className="mb-6">
              <Input label="Password" placeholder="••••••••" name="password" type="password" />
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