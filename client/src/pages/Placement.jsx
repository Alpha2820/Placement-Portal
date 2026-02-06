import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPlacements } from '../utils/api';

function Placements() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    company: '',
    batch: '',
    minPackage: '',
    maxPackage: ''
  });

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const data = await getAllPlacements();
      setPlacements(data.placements);
    } catch (error) {
      console.error('Error fetching placements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      company: '',
      batch: '',
      minPackage: '',
      maxPackage: ''
    });
  };

  const filteredPlacements = placements.filter(placement => {
    const matchCompany = filters.company === '' || 
      placement.company.toLowerCase().includes(filters.company.toLowerCase());
    
    const matchBatch = filters.batch === '' || 
      placement.batch.includes(filters.batch);
    
    const matchMinPackage = filters.minPackage === '' || 
      placement.package >= parseFloat(filters.minPackage);
    
    const matchMaxPackage = filters.maxPackage === '' || 
      placement.package <= parseFloat(filters.maxPackage);

    return matchCompany && matchBatch && matchMinPackage && matchMaxPackage;
  });

  const uniqueCompanies = [...new Set(placements.map(p => p.company))];
  const uniqueBatches = [...new Set(placements.map(p => p.batch))];

  // Calculate stats
  const avgPackage = placements.length > 0 
    ? (placements.reduce((sum, p) => sum + p.package, 0) / placements.length).toFixed(2)
    : 0;
  const maxPackage = placements.length > 0 
    ? Math.max(...placements.map(p => p.package))
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-semibold">Loading placements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                All Placements
              </h1>
              <p className="text-gray-600 mt-1">Explore verified placement records</p>
            </div>
            <Link to="/">
              <button className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-200">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-blue-100 text-sm font-semibold uppercase">Total Placements</p>
            <p className="text-4xl font-bold mt-2">{placements.length}</p>
          </div>
          <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-green-100 text-sm font-semibold uppercase">Average Package</p>
            <p className="text-4xl font-bold mt-2">₹{avgPackage} LPA</p>
          </div>
          <div className="bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
            <p className="text-purple-100 text-sm font-semibold uppercase">Highest Package</p>
            <p className="text-4xl font-bold mt-2">₹{maxPackage} LPA</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">🔍 Filter Placements</h3>
            <button 
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company
              </label>
              <input
                type="text"
                name="company"
                value={filters.company}
                onChange={handleFilterChange}
                placeholder="Search company..."
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Batch
              </label>
              <select
                name="batch"
                value={filters.batch}
                onChange={handleFilterChange}
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              >
                <option value="">All Batches</option>
                {uniqueBatches.map(batch => (
                  <option key={batch} value={batch}>{batch}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Min Package (LPA)
              </label>
              <input
                type="number"
                name="minPackage"
                value={filters.minPackage}
                onChange={handleFilterChange}
                placeholder="Min"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Max Package (LPA)
              </label>
              <input
                type="number"
                name="maxPackage"
                value={filters.maxPackage}
                onChange={handleFilterChange}
                placeholder="Max"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              />
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing <strong>{filteredPlacements.length}</strong> of <strong>{placements.length}</strong> placements
          </div>
        </div>

        {/* Placements List */}
        {filteredPlacements.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-12 text-center border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg font-semibold">No placements found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredPlacements.map((placement) => (
              <div 
                key={placement._id} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-l-4 border-blue-500"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {placement.company}
                        </h3>
                        <div className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          ✓ Verified
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Package</p>
                        <p className="text-3xl font-bold text-green-600">₹{placement.package}</p>
                        <p className="text-sm text-gray-500">LPA</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Student:</strong>{' '}
                          {placement.isAnonymous ? '🔒 Anonymous' : placement.studentName}
                        </p>
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Batch:</strong> {placement.batch}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <strong className="text-gray-800">Posted:</strong>{' '}
                          {new Date(placement.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>

                    {placement.interviewExperience && (
                      <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                        <strong className="text-gray-800 mb-2 flex items-center gap-2">
                          💡 Interview Experience
                        </strong>
                        <p className="text-gray-700 leading-relaxed">
                          {placement.interviewExperience}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Placements;