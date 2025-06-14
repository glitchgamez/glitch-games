import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

export interface Game {
  id: string;
  title: string;
  description: string;
  image_url: string;
  download_url: string;
  category: string;
  file_size: string;
  created_at: string;
}

interface DatabaseContextType {
  games: Game[];
  loading: boolean;
  addGame: (game: Omit<Game, 'id' | 'created_at'>) => Promise<void>;
  deleteGame: (id: string) => Promise<void>;
  refreshGames: () => Promise<void>;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};

interface DatabaseProviderProps {
  children: ReactNode;
}

export const DatabaseProvider: React.FC<DatabaseProviderProps> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGames = async () => {
    try {
      const { data, error } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGames(data || []);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGame = async (game: Omit<Game, 'id' | 'created_at'>) => {
    try {
      const { error } = await supabase
        .from('games')
        .insert([game]);

      if (error) throw error;
      await fetchGames();
    } catch (error) {
      console.error('Error adding game:', error);
      throw error;
    }
  };

  const deleteGame = async (id: string) => {
    try {
      const { error } = await supabase
        .from('games')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchGames();
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  };

  const refreshGames = async () => {
    await fetchGames();
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const value = {
    games,
    loading,
    addGame,
    deleteGame,
    refreshGames,
  };

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
};