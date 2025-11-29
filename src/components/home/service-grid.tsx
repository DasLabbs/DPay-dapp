import React from 'react';
import toast from 'react-hot-toast';
import ApartmentIcon from '@assets/utils/apartment.svg?react';
import BillIcon from '@assets/utils/bill.svg?react';
import CinemaIcon from '@assets/utils/cinema.svg?react';
import DataIcon from '@assets/utils/data.svg?react';
import ElectricityIcon from '@assets/utils/electricity.svg?react';
import EnvironmentIcon from '@assets/utils/environment.svg?react';
import InternetIcon from '@assets/utils/internet.svg?react';
import PublicIcon from '@assets/utils/public.svg?react';
import TelevisionIcon from '@assets/utils/television.svg?react';
import TravelIcon from '@assets/utils/travel.svg?react';
import TuitionFeeIcon from '@assets/utils/tuition-fee.svg?react';
import WaterIcon from '@assets/utils/water.svg?react';

interface ServiceItem {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const SERVICES: ServiceItem[] = [
  { icon: ElectricityIcon, label: 'Electricity' },
  { icon: WaterIcon, label: 'Water' },
  { icon: InternetIcon, label: 'Internet' },
  { icon: DataIcon, label: 'Data 4G/5G' },
  { icon: CinemaIcon, label: 'Cinema' },
  { icon: TravelIcon, label: 'Travel' },
  { icon: TelevisionIcon, label: 'Television' },
  { icon: BillIcon, label: 'Bill Payment' },
  { icon: ApartmentIcon, label: 'Apartment' },
  { icon: TuitionFeeIcon, label: 'Tuition Fees' },
  { icon: PublicIcon, label: 'Public Service' },
  { icon: EnvironmentIcon, label: 'Environmental' },
];

const ServiceGrid = () => {
  const handleClick = () => {
    toast('Coming Soon!', {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    });
  };

  return (
    <div className="mb-6 flex flex-col gap-4 px-4 py-2">
      <div className="grid grid-cols-4 gap-4">
        {SERVICES.map((service, index) => (
          <div
            key={index}
            onClick={handleClick}
            className="flex h-[64px] cursor-pointer flex-col items-center gap-2 transition-transform"
          >
            <div className="flex w-full items-center justify-center rounded-2xl">
              <service.icon className="w-[34px]" />
            </div>
            <div className="text-center text-[10px] leading-[14px] text-[#1B1B1D]">{service.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGrid;
