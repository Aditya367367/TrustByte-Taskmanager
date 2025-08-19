import React from 'react';
import { Link } from 'react-router-dom';

import { Frown } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="flex justify-center mb-6 text-purple-400">
          <Frown size={64} />
        </div>
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        
        <Link 
          to="/" 
          className="mt-6 inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}