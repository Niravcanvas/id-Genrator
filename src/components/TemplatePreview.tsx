'use client';

import React from 'react';
import IDCardTemplate from './IDCardTemplate';
import { IDCardData, HackathonInfo } from '@/types';

const TemplatePreview: React.FC = () => {
  const sampleData: IDCardData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Full Stack Developer',
    company: 'Tech Innovations Inc.',
    phone: '+1 (555) 123-4567',
    participantId: 'PART-0001',
    qrCodeDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  };

  const hackathonInfo: HackathonInfo = {
    name: 'HackFest 2026',
    date: 'February 15-16, 2026',
    venue: 'Tech Hub Convention Center',
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Template Preview</h3>
      <div className="transform scale-75 origin-top">
        <IDCardTemplate data={sampleData} hackathonInfo={hackathonInfo} />
      </div>
    </div>
  );
};

export default TemplatePreview;