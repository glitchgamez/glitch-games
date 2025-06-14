import React, { useState } from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import GameCard from '../components/GameCard';
import { GamepadIcon, Search, Filter } from 'lucide-react';

const Home: React.FC = () => {
  const { games, loading } = useDatabase();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(games.map(game => game.category)))];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <GamepadIcon className="h-16 w-16 text-blue-600 mr-4" />
          <h1 className="text-5xl font-bold text-gray-800">Game Download Hub</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover and download amazing games from our curated collection. 
          From action-packed adventures to mind-bending puzzles, find your next favorite game here.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {searchTerm || selectedCategory !== 'All' ? (
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredGames.length} of {games.length} games
            {searchTerm && ` matching "${searchTerm}"`}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          </div>
        ) : null}
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="text-center py-16">
          <GamepadIcon className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-600 mb-4">
            {games.length === 0 ? 'No Games Available' : 'No Games Found'}
          </h2>
          <p className="text-gray-500 text-lg">
            {games.length === 0 
              ? 'Check back later for new game releases!' 
              : 'Try adjusting your search or filter criteria.'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      {/* Stats Section */}
      {games.length > 0 && (
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold mb-2">{games.length}</h3>
              <p className="text-blue-100">Total Games</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">{categories.length - 1}</h3>
              <p className="text-blue-100">Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-2">Free</h3>
              <p className="text-blue-100">All Downloads</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;