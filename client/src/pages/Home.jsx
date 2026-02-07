import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 opacity-90"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Welcome to
              <span className="block mt-2 bg-clip-text text-transparent bg-linear-to-r from-yellow-300 to-pink-300">
                Placement Portal
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Share your placement success stories and inspire your juniors 🚀
            </p>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/login">
                  <button className="w-64 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="w-64 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                    Register Now
                  </button>
                </Link>

                <Link to="/admin-register">
                  <button className="w-64 bg-linear-to-r from-red-500 to-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                    🔐 Admin Sign Up
                  </button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-2xl text-white font-semibold mb-6">
                  Welcome back, {user.name}! 👋
                </p>
                <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                  <button className="w-64 bg-white text-blue-600 font-bold py-4 px-8 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            )}

            <div className="mt-16 flex flex-col sm:flex-row gap-4 justify-center ">
              <Link to="/placements">
                <button className="bg-linear-to-r from-orange-500 to-red-500 text-white font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                  🎯 View All Placements
                </button>
              </Link>
              <Link to="/company-visits">
                <button className="bg-linear-to-r from-cyan-500 to-blue-500 text-white font-bold py-4 px-10 rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition duration-300">
                  🏢 Company Visits
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
            Why Use Our Platform?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Track Success
              </h3>
              <p className="text-gray-600">
                View verified placement records with package details and company
                information
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Learn & Prepare
              </h3>
              <p className="text-gray-600">
                Read interview experiences and tips from students who got placed
              </p>
            </div>

            <div className="bg-linear-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">
                Share Your Story
              </h3>
              <p className="text-gray-600">
                Help juniors by sharing your placement journey and success story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Made with ❤️ for students | Placement Portal 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
