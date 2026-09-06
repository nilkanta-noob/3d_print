import React from 'react';
import { Heart, Download, MessageSquare } from 'lucide-react';

export interface ModelCardProps {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  likes: number;
  downloads: number;
  comments: number;
}

export default function ModelCard({ title, author, imageUrl, likes, downloads, comments }: ModelCardProps) {
  return (
    <div className="group flex flex-col bg-white dark:bg-[#1f1f1f] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      
      {/* Image Area */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick action button (like) */}
        <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/50 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-[-10px] group-hover:translate-y-0">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-600 dark:group-hover:text-orange-500 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 hover:underline cursor-pointer">
          by {author}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between text-xs font-medium text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-orange-600 transition-colors cursor-pointer">
              <Heart className="w-4 h-4" /> {likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> {comments}
            </span>
          </div>
          <span className="flex items-center gap-1 hover:text-orange-600 transition-colors cursor-pointer">
            <Download className="w-4 h-4" /> {downloads}
          </span>
        </div>
      </div>
    </div>
  );
}
