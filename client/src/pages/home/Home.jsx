import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { fetchScreensAPI } from '../../utility/api';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [screens, setScreens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchScreens = async () => {
            try {
                const { data } = await fetchScreensAPI();
                if (data.success) {
                    setScreens(data.screens);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch screens');
            }
        };


        fetchScreens();
    }, []);

    const filteredScreens = screens.filter(
        (screen) =>
            screen.name.toLowerCase().includes(searchTerm.toLowerCase()) || screen.movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-white mt-4 sm:mt-6 md:mt-8">Discover Screens for movies</h2>

            <div className='flex items-center justify-center gap-1 sm:gap-2 py-1 sm:py-1 md:py-2 px-4 mb-3 sm:my-4 bg-zinc-600/20 rounded-xl'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search by screen name or movie title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className='w-full bg-transparent py-1 sm:py-2 px-2 sm:px-4 outline-none text-white focus:bg-transparent' />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredScreens.map((screen) => {
                    return (
                        <div key={screen._id} className="flex flex-col gap-2 text-white p-6 bg-zinc-700/30 rounded-lg shadow-md ">
                            <p className="mb-2 text-3xl font-bold text-blue-200 tracking-widest">{screen.movie ? screen.movie.title : 'Loading...'}.</p>
                            <h3 className="text-sm md:text-lg font-semibold lg:text-xl"><span className='font-normal text-zinc-400'>At </span> {screen.name}</h3>
                            <p className="mb-2 text-zinc-400">{screen.address}</p>
                            <p className="mb-2 font-semibold">Total Seats: {screen.totalSeats}</p>
                            <div className='my-2'>
                                <h4 className="font-bold">Show Details:</h4>
                                <div className="mt-2 tracking-widest">
                                    <p className="border border-zinc-600 px-4 py-2 rounded-t-md">
                                        Date: {new Date(screen.showtimes.date).toLocaleDateString()}
                                    </p>
                                    <p className="border border-zinc-600 px-4 py-2">
                                        Time: {screen.showtimes.time}
                                    </p>
                                    <p className="border border-zinc-600 px-4 py-2 rounded-b-md">
                                        Price: {screen.showtimes.price}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <Link className='flex items-center justify-center gap-2  py-2 px-2 rounded-md bg-zinc-500/20 hover:bg-blue-500/40' to={`/screens/${screen._id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                    More Details</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HomePage;
