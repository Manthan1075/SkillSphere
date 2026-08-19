import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/common/EmptyState';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <EmptyState
        icon="error"
        title="404 - Page Not Found"
        description="The page you are trying to visit does not exist or has been moved."
        actionText="Back to Homepage"
        onAction={() => navigate('/')}
      />
    </div>
  );
};
