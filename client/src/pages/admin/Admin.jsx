import { useContext, useState } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/Context';
import { adminLogin } from '../../utility/api';

const Admin = () => {
    const { setUser } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const { data } = await adminLogin(formData);
                if (data.success) {
                    toast.success(data.message);
                    setUser(data.user);
                    navigate('/')
                }
                else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-800 p-4">
            <div className="bg-zinc-700/20 px-8 py-10 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Login!</h2>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div>
                        <label className="block text-zinc-300 py-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='e.g. user@gmail.com'
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 outline-none rounded bg-zinc-700/20 focus:bg-zinc-700 mt-1"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-zinc-300 py-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder='e.g. pass@123'
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 outline-none rounded bg-zinc-700/20 focus:bg-zinc-700 mt-1"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-900 font-semibold text-white rounded mt-4 hover:bg-blue-700"
                    >
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
