import { useEffect, useState } from 'react';
import { getDeals } from '../services/deal';
import { Deal } from '../types/Deal';
import { Comment } from '../types/Comment';
import axios from 'axios';

const Home = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [comments, setComments] = useState<{ [key: number]: Comment[] }>({}); // Store comments for each deal
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({}); // Track new comments input

  // Fetch deals when the component loads
  useEffect(() => {
    const fetchDeals = async () => {
      const dealsData = await getDeals();
      setDeals(dealsData);
    };
    fetchDeals();
  }, []);

  // Handle like functionality
  const likeDeal = async (dealId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to like a deal.');
      return;
    }

    await axios.post(
      `http://localhost:5000/api/deals/${dealId}/like`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Optionally, refresh deals to update like count
    const updatedDeals = await getDeals();
    setDeals(updatedDeals);
  };

  // Handle delete functionality (only allow the user who posted it)
  const deleteDeal = async (dealId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to delete a deal.');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/deals/${dealId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted deal from the local state
      setDeals(deals.filter((deal) => deal.id !== dealId));
    } catch (error) {
      console.error('Failed to delete the deal', error);
    }
  };

  // Handle adding a new comment
  const addComment = async (dealId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to comment.');
      return;
    }

    try {
      const content = newComment[dealId] || '';
      await axios.post(
        `http://localhost:5000/api/deals/${dealId}/comments`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear the new comment input
      setNewComment({ ...newComment, [dealId]: '' });
      
      // Fetch updated comments
      const response = await axios.get(`http://localhost:5000/api/deals/${dealId}/comments`);
      setComments({ ...comments, [dealId]: response.data });
    } catch (error) {
      console.error('Failed to add a comment', error);
    }
  };

  // Fetch comments for each deal
  const fetchComments = async (dealId: number) => {
    const response = await axios.get(`http://localhost:5000/api/deals/${dealId}/comments`);
    setComments({ ...comments, [dealId]: response.data });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold">Latest Deals</h1>
      <ul>
        {deals.map((deal) => (
          <li key={deal.id} className="p-4 border-b">
            <h2 className="text-xl">{deal.title}</h2>
            <p>{deal.description}</p>
            <p>Posted by: {deal.username}</p> {/* Display the username */}
            <p>{deal.likes} Likes</p> {/* Show like count */}
            <button
              onClick={() => likeDeal(deal.id)}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Like
            </button>

            {/* Allow deal creator to delete the deal */}
            {localStorage.getItem('userId') === String(deal.user_id) && (
              <button
                onClick={() => deleteDeal(deal.id)}
                className="bg-red-500 text-white p-2 rounded ml-2"
              >
                Delete
              </button>
            )}

            {/* Comment Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">Comments</h3>
              <ul>
                {comments[deal.id]?.map((comment) => (
                  <li key={comment.id}>
                    <p>{comment.username}: {comment.content}</p> {/* Display username of the comment */}
                  </li>
                ))}
              </ul>

              {/* Add new comment */}
              <textarea
                value={newComment[deal.id] || ''}
                onChange={(e) => setNewComment({ ...newComment, [deal.id]: e.target.value })}
                placeholder="Add a comment"
                className="w-full p-2 border rounded mt-2"
              />
              <button
                onClick={() => addComment(deal.id)}
                className="bg-green-500 text-white p-2 rounded mt-2"
              >
                Comment
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
