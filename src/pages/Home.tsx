import React from 'react';
import { useDatabase } from '../contexts/DatabaseContext';
import GameCard from '../components/GameCard';
import { GamepadIcon } from 'lucide-react';

const Home: React.FC = () => {
  const { games, loading } = useDatabase();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <GamepadIcon className="h-12 w-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-800">Game Download Hub</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover and download amazing games from our curated collection. 
          Sign in to access exclusive content and admin features.
        </p>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-12">
          <GamepadIcon className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-600 mb-2">No Games Available</h2>
          <p className="text-gray-500">Check back later for new game releases!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;