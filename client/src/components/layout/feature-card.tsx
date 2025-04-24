import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-dark-800/50 backdrop-blur-md p-6 rounded-xl border border-primary/20 hover:border-primary/40 transition duration-300 hover:shadow-[0_4px_14px_0_rgba(15,108,142,0.3)]">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
