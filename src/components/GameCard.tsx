import React from 'react';
import { Download, Calendar, HardDrive, ExternalLink } from 'lucide-react';
import { Game } from '../contexts/DatabaseContext';

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const handleDownload = () => {
    window.open(game.download_url, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden">
        <img
          src={game.image_url}
          alt={game.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{game.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{game.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{new Date(game.created_at).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <HardDrive className="h-4 w-4 mr-1" />
            <span>{game.file_size}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
            {game.category}
          </span>
          <button
            onClick={handleDownload}
            className="flex items-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
            <ExternalLink className="h-3 w-3 ml-1 opacity-75" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;