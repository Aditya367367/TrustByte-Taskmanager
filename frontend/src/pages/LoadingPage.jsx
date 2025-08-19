import React from 'react';
import StatusMessage from '../components/Loader';

export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <StatusMessage message="Loading, please wait..." type="loading" />
    </div>
  );
}