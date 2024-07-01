import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { bookSeatsAPI, fetchScreenByIdAPI } from '../../../utility/api';
// import { fetchScreenByIdAPI, fetchMovieByIdAPI, bookSeatsAPI } from '../../../../../utility/api';

const Screen = () => {
    const { id } = useParams();
    const [screen, setScreen] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    useEffect(() => {
        const fetchScreen = async () => {
            try {
                const { data } = await fetchScreenByIdAPI(id);
                if (data.success) {
                    setScreen(data.screen);
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        };
        fetchScreen();
    }, [id]);

    const handleSeatSelect = (seatIndex) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatIndex)) {
                return prevSelectedSeats.filter((index) => index !== seatIndex);
            } else {
                return [...prevSelectedSeats, seatIndex];
            }
        });
    };

    const handleProceedToPayment = async () => {
        try {
            const { data } = await bookSeatsAPI({
                screenId: screen._id,
                seats: selectedSeats,
                price: selectedSeats.length * screen.showtimes.price,
            });
            if (data.success) {
                toast.success('Seats booked successfully');
                // Redirect to payment page or confirmation page
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };


    const totalPrice = screen && selectedSeats.length * screen.showtimes.price;

    return (
        <>
            {screen && <div className="container mx-auto p-4 bg-zinc-800 text-white">
                <h2 className="text-2xl font-bold mb-4">{screen.name}</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Screen Details</h3>
                    <p><strong>Address:</strong> {screen.address}</p>
                    <p><strong>Total Seats:</strong> {screen.totalSeats}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Movie Details</h3>
                    <p><strong>Title:</strong> {screen.movie.title}</p>
                    <p><strong>Description:</strong> {screen.movie.description}</p>
                    <p><strong>Duration:</strong> {screen.movie.duration} minutes</p>
                    <p><strong>Genre:</strong> {screen.movie.genre.join(', ')}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Showtimes</h3>
                    <div className="mt-2">
                        <p><strong>Date:</strong> {new Date(screen.showtimes.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {screen.showtimes.time}</p>
                        <p><strong>Price per seat:</strong> {screen.showtimes.price}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold my-4">Seats</h3>
                    <div className="grid grid-cols-10 gap-2">
                        {screen.seats.map((seat) => (
                            <button
                                key={seat.seatIndex}
                                onClick={() => handleSeatSelect(seat.seatIndex)}
                                className={`p-2 hover:border-green-400 shadow-none rounded ${seat.status === 'available' ? 'border-gray-500 border bg-zinc-700/20' :
                                    seat.status === 'locked' ? '!bg-yellow-600/20 border-none text-zinc-500' : '!bg-zinc-600/20 border-none text-zinc-500'
                                    } ${selectedSeats.includes(seat.seatIndex) ? '!bg-green-600' : ''}`}
                                disabled={seat.status !== 'available'}
                            >
                                {seat.seatIndex}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-bold">Total Price: {totalPrice}</h3>
                </div>
                <button
                    onClick={handleProceedToPayment}
                    className="bg-blue-500 text-white py-2 px-4 rounded-md"
                >
                    Proceed to Payment
                </button>
            </div>}
        </>
    );
};

export default Screen;
