import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Profile {
  username: string;
  email: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }

      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      setUsername(response.data.username);
      setEmail(response.data.email);
    };

    fetchProfile();
  }, [navigate]);

  const updateProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.put(
      'http://localhost:5000/api/users/profile',
      { username, email },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditMode(false);
  };

  return (
    <div className="container mx-auto p-6">
      {profile ? (
        <div>
          <h2 className="text-2xl font-bold">Profile</h2>
          {editMode ? (
            <div className="space-y-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <button onClick={updateProfile} className="bg-blue-500 text-white p-2 rounded">
                Save
              </button>
            </div>
          ) : (
            <div>
              <p>Username: {profile.username}</p>
              <p>Email: {profile.email}</p>
              <button onClick={() => setEditMode(true)} className="bg-gray-500 text-white p-2 rounded">
                Edit Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
