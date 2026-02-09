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
      <div className="bg-linear-to-br from-slate-800 to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Why Use Our Platform?
          </h2>
          <p className="text-center text-gray-300 mb-16 text-lg">
            Everything you need for placement success in one place
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-linear-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:-translate-y-2 border border-blue-500">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Track Success
              </h3>
              <p className="text-blue-100">
                View verified placement records with package details and company
                information
              </p>
            </div>

            <div className="bg-linear-to-br from-purple-600 to-purple-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:-translate-y-2 border border-purple-500">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Learn & Prepare
              </h3>
              <p className="text-purple-100">
                Read interview experiences and tips from students who got placed
              </p>
            </div>

            <div className="bg-linear-to-br from-pink-600 to-pink-700 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition duration-300 transform hover:-translate-y-2 border border-pink-500">
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-2xl font-bold mb-3 text-white">
                Share Your Story
              </h3>
              <p className="text-pink-100">
                Help juniors by sharing your placement journey and success story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-linear-to-br from-slate-700 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-300 mb-16 text-lg">
            Got questions? We've got answers!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-blue-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  How do I submit my placement details?
                  <span className="text-3xl text-blue-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Register/Login as a student, go to your dashboard, click
                  "Submit New Placement", fill in your details including company
                  name, package, and upload your offer letter and ID card.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-purple-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  How long does admin approval take?
                  <span className="text-3xl text-purple-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Admins typically review and approve placements within 24-48
                  hours. You'll be able to see the status in your dashboard.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-green-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  Can I submit my placement anonymously?
                  <span className="text-3xl text-green-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Yes! When submitting your placement, there's a checkbox option
                  to "Submit anonymously". Your name will be hidden on the
                  public page.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-orange-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  What documents do I need to upload?
                  <span className="text-3xl text-orange-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  You need: (1) Offer letter (PDF/image, max 5MB), and (2)
                  College ID card (image, max 5MB) for verification.
                </p>
              </details>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-pink-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  What is the Company Visits section?
                  <span className="text-3xl text-pink-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Shows companies recruiting from our college with roles,
                  package ranges, eligibility criteria, and job descriptions to
                  help you prepare.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-indigo-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  How do I become an admin?
                  <span className="text-3xl text-indigo-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Admin accounts require a secret code provided to authorized
                  placement coordinators. Contact the main administrator for
                  access.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-red-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  Can I edit my placement after submission?
                  <span className="text-3xl text-red-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Currently not supported. If you made a mistake, contact an
                  admin or delete and resubmit with correct information.
                </p>
              </details>

              <details className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition border-l-4 border-teal-500">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-lg text-gray-800">
                  Is my personal information secure?
                  <span className="text-3xl text-teal-600 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  Yes! All data is securely stored. Only admins see it for
                  verification. You can choose to display or hide your name
                  publicly.
                </p>
              </details>
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
