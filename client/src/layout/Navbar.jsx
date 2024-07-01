import { useCallback, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserAPI, logoutAPI } from '../utility/api';
import { Context } from '../context/Context';

const Navbar = () => {
    const { user, setUser } = useContext(Context);

    const location = useLocation();

    const fetchLoggedUser = useCallback(async () => {
        try {
            const { data } = await getUserAPI();
            console.log(data);
            if (data.success) {
                setUser(data.user);
            }
            else {
                setUser({});
            }
        } catch (error) {
            console.log(error);
        }
    }, [setUser])

    useEffect(() => {
        fetchLoggedUser();
    }, [location.pathname, fetchLoggedUser]);

    const isAuthenticated = user.name ? true : false;

    const routes = [
        {
            path: "/",
            label: "Home",
        },
        {
            path: "/movies",
            label: "Movies",
        },
        {
            path: "/screens",
            label: "Screens",
        },
        {
            path: "/bookings",
            label: "My Booking",
        },
        {
            path: "/orders",
            label: "My Orders",
        },
        {
            path: "/notifications",
            label: "Notifications",
        }
    ];

    return (
        <nav className="bg-zinc-800 backdrop-blur-md border-b-2 border-b-white/40">
            <div className="sm:text-base text-sm  container mx-auto px-4 py-5 font-semibold">
                <div className="flex justify-between items-center text-sm sm:text-base">
                    <div className="flex space-x-4 ">
                        {routes.map((route, index) => (
                            <Link key={index} to={route.path} className={`text-white hover:text-blue-200 ${location.pathname == route.path && 'border-b-2 border-b-white'}`}>
                                {route.label}
                            </Link>
                        ))}
                        {user.role === "admin" && <Link to={'/admin/dashboard'} className={`text-blue-300 hover:text-blue-200 ${location.pathname == '/admin/dashboard' && 'border-b-2 border-b-white'}`}>
                            Dashboard
                        </Link>}
                    </div>

                    <div className="flex space-x-4">
                        {isAuthenticated ? (
                            <>
                                <p className="hidden sm:flex text-white items-center justify-center gap-0.5 sm:gap-1 bg-zinc-100/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-md  transition-all cursor-pointer shadow-[1px_1px_0_0] shadow-white hover:shadow-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className='font-normal'> {user.name}</span>
                                </p>
                                <button className="bg-red-300 text-black px-2 py-1 text-xs sm:text-sm rounded-md " onClick={async () => {
                                    await logoutAPI();
                                    setUser([])
                                }}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`bg-blue-300 text-black py-1 px-2 text-xs sm:text-sm rounded-md`}>
                                    Login
                                </Link>
                                <Link to="/register" className={`bg-blue-300 text-black px-2 py-1 text-xs sm:text-sm rounded-md`}>
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Navbar;
