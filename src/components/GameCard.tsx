import React from 'react';
import { Download, Calendar, HardDrive } from 'lucide-react';
import { Game } from '../contexts/DatabaseContext';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const handleDownload = () => {
    window.open(game.download_url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={game.image_url}
        alt={game.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{game.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{game.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {new Date(game.created_at).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <HardDrive className="h-4 w-4 mr-1" />
            {game.file_size}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {game.category}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;