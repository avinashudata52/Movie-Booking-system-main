import { useContext, useState } from 'react';
import { registerAPI } from '../../utility/api';
import { toast } from 'sonner';
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { setUser } = useContext(Context);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        const passwordRegex = /^(?=.*[\W_]).{6,}$/;

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password || !passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must contain at least 1 special character, and be at least 6 characters long.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const { data } = await registerAPI({ ...formData, role: "user" });
                if (data.success) {
                    setUser(data.user);
                    toast.success(data.message);
                    navigate('/');
                } else {
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
            <div className="bg-zinc-700/20 p-8 rounded shadow-md w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Create an Account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-zinc-300 py-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='e.g. Rajesh Adeli'
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 outline-none rounded bg-zinc-700/20 focus:bg-zinc-700 mt-1"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <label className="block text-zinc-300 py-2">Enter your email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder='e.g user@gmail.com'
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
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
