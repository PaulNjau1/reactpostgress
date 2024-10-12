import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('token'); // Check if user is logged in

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">X.com Clone</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Home</Link>
          
          {token ? (
            <>
              <Link to="/create-deal" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Create Post/Deal</Link> {/* New Link */}
              <Link to="/profile" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Profile</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token'); // Log out user
                  window.location.reload();
                }}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Login</Link>
              <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
