import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { fetchFoodItemByIdAPI, updateFoodItemsAPI } from '../../../../../utility/api';

const EditFoodItem = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFoodItem = async () => {
            try {
                const { data } = await fetchFoodItemByIdAPI(id);
                if (data.success) {
                    setFormData({
                        name: data.foodItem.name,
                        quantity: data.foodItem.quantity,
                        price: data.foodItem.price,
                    });
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        };
        fetchFoodItem();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const { name, quantity, price } = formData;
        if (!name || !quantity || !price) {
            toast.error('All fields are required');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const { data } = await updateFoodItemsAPI(id, formData);
                if (data.success) {
                    toast.success('Food item updated successfully');
                    navigate('/admin/dashboard');
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error('Something went wrong');
            }
        }
    };

    return (
        <div className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Edit Food Item</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter food item name"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
              Update Food Item
            </button>
          </form>
        </div>
      );
      
};

export default EditFoodItem;
