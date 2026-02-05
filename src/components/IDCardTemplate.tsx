import React from 'react';
import { IDCardData, HackathonInfo } from '@/types';
import Image from 'next/image';

interface IDCardTemplateProps {
  data: IDCardData;
  hackathonInfo: HackathonInfo;
}

const IDCardTemplate: React.FC<IDCardTemplateProps> = ({ data, hackathonInfo }) => {
  return (
    <div className="w-[400px] h-[600px] bg-white border-4 border-black relative overflow-hidden font-azeret">
      {/* Header Section */}
      <div className="bg-black text-white p-6 text-center">
        <h1 className="text-2xl font-bold tracking-tight uppercase">{hackathonInfo.name}</h1>
        <p className="text-sm mt-1">{hackathonInfo.date}</p>
        <p className="text-xs mt-1">{hackathonInfo.venue}</p>
      </div>

      {/* Participant Info Section */}
      <div className="p-6">
        <div className="border-2 border-black p-4 mb-4">
          <h2 className="text-3xl font-bold uppercase mb-2 break-words">{data.name}</h2>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-semibold">Role:</span> {data.role}
            </div>
            <div>
              <span className="font-semibold">Company:</span> {data.company}
            </div>
            <div>
              <span className="font-semibold">Email:</span> 
              <span className="text-xs block mt-1">{data.email}</span>
            </div>
            <div>
              <span className="font-semibold">Phone:</span> {data.phone}
            </div>
            <div>
              <span className="font-semibold">ID:</span> {data.participantId}
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="border-2 border-black p-4 flex flex-col items-center">
          <p className="text-xs font-semibold mb-2 uppercase">Scan for Details</p>
          <div className="bg-white p-2 border border-black">
            <img 
              src={data.qrCodeDataURL} 
              alt="QR Code" 
              className="w-32 h-32"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 bg-black text-white text-center py-2">
        <p className="text-xs uppercase tracking-widest">Participant ID Card</p>
      </div>
    </div>
  );
};

export default IDCardTemplate;