import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { createDeal } from '../services/deal';

export interface DealFormInputs {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    image_url: string;
  }

const CreateDeal = () => {
  const { register, handleSubmit, reset } = useForm<DealFormInputs>();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: DealFormInputs) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }
      await createDeal(data, token);
      reset();
      navigate('/');
    } catch (err) {
      setError('Failed to create deal');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Create a Deal</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('title')}
          placeholder="Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          {...register('description')}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          {...register('category')}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          {...register('subcategory')}
          placeholder="Subcategory"
          className="w-full p-2 border rounded"
        />
        <input
          {...register('image_url')}
          placeholder="Image URL"
          className="w-full p-2 border rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Deal
        </button>
      </form>
    </div>
  );
};

export default CreateDeal;
