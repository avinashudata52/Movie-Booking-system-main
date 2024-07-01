import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteByIdAPI, fetchFoodItemsAPI, fetchMoviesAPI, fetchScreensAPI } from '../../../utility/api';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [screens, setScreens] = useState([]);
    const [foodItems, setFoodItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await fetchMoviesAPI();
                const screensResponse = await fetchScreensAPI();
                const foodItemsResponse = await fetchFoodItemsAPI();

                setMovies(moviesResponse.data.movies);
                console.log(screensResponse.data.screens);
                setScreens(screensResponse.data.screens);
                setFoodItems(foodItemsResponse.data.foodItems);
            }
            catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        };
        fetchData();
    }, []);

    const deleteItem = async (id, type) => {
        try {
            const { data } = await deleteByIdAPI(type, id);
            if (data.success) {
                toast.success(data.message);
                // Refresh data after deletion
                if (type === 'movies') {
                    setMovies(movies.filter((movie) => movie._id !== id));
                } else if (type === 'screens') {
                    setScreens(screens.filter((screen) => screen._id !== id));
                } else if (type === 'food-items') {
                    setFoodItems(foodItems.filter((item) => item._id !== id));
                }
            }
            else {
                toast.success(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Link to="/admin/dashboard/movies/new" className="flex items-center justify-center gap-2 bg-zinc-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add New Movie
                </Link>
                <Link to="/admin/dashboard/screens/new" className="flex items-center justify-center gap-2 bg-zinc-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add New Screen
                </Link>
                <Link to="/admin/dashboard/foods/new" className="flex items-center justify-center gap-2 bg-zinc-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add New Food Item
                </Link>
            </div>
            <h3 className="text-xl font-bold mb-2">Movies</h3>
            <table className="min-w-full bg-zinc-700">
                <thead>
                    <tr>
                        <th className="py-2">Sr No.</th>
                        <th className="py-2">Title</th>
                        <th className="py-2">Genre</th>
                        <th className="py-2">Duration</th>
                        <th className="py-2">Edit</th>
                        <th className="py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie, index) => (
                        <tr key={movie._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{movie.title}</td>
                            <td className="border px-4 py-2">{movie.genre.join(', ')}</td>
                            <td className="border px-4 py-2">{movie.duration} min</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/dashboard/movies/${movie._id}`} className="text-blue-400 ">
                                    Edit
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => deleteItem(movie._id, 'movies')} className="text-red-400 shadow-none">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-xl font-bold mb-2 mt-6">Screens</h3>
            <table className="min-w-full bg-zinc-700">
                <thead>
                    <tr>
                        <th className="py-2">Sr No.</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Movie</th>
                        <th className="py-2">Date</th>
                        <th className="py-2">Time (24 H)</th>
                        <th className="py-2">Edit</th>
                        <th className="py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {screens.map((screen, index) => (
                        <tr key={screen._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{screen.name}</td>
                            <td className="border px-4 py-2">{screen.movie.title}</td>
                            <td className="border px-4 py-2 tracking-widest">{new Date(screen.showtimes.date).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 tracking-widest">{screen.showtimes.time}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/dashboard/screens/${screen._id}`} className="text-blue-400">
                                    Edit
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => deleteItem(screen._id, 'screens')} className="text-red-400 shadow-none">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3 className="text-xl font-bold mb-2 mt-6">Food Items</h3>
            <table className="min-w-full bg-zinc-700">
                <thead>
                    <tr>
                        <th className="py-2">Sr No.</th>
                        <th className="py-2">Name</th>
                        <th className="py-2">Quantity</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Edit</th>
                        <th className="py-2">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map((item, index) => (
                        <tr key={item._id}>
                            <td className="border px-4 py-2">{index + 1}</td>
                            <td className="border px-4 py-2">{item.name}</td>
                            <td className="border px-4 py-2">{item.quantity}</td>
                            <td className="border px-4 py-2">${item.price}</td>
                            <td className="border px-4 py-2">
                                <Link to={`/admin/dashboard/food-items/${item._id}`} className="text-blue-400 ">
                                    Edit
                                </Link>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => deleteItem(item._id, 'food-items')} className="text-red-400 shadow-none">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;
