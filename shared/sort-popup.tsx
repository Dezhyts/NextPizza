'use client';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

export type SortOption = 'title' | 'newest';

interface OptionSort {
  label: string;
  value: SortOption;
}

interface SortPopupProps {
  className?: string;
}

export const SortPopup = ({
  className,
}: SortPopupProps) => {
  const options: OptionSort[] = [
    { label: 'По названию', value: 'title' },
    { label: 'Сначала новые', value: 'newest' },
  ];

  const [selected, setSelected] = useState(0);

  const handleClick = async () => {
    const next = (selected + 1) % options.length;
    setSelected(next);
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 bg-gray-50 px-4 h-[55px] rounded-2xl cursor-pointer',
        className,
      )}
    >
      <Button variant="outline" onClick={handleClick} className="border-none">
        <span className="flex items-center gap-[6px]">
          <ArrowUpDown size={16} className="text-black" />
          <b>Сортировка:</b>
          <b className="text-primary">{options[selected].label}</b>
        </span>
      </Button>
    </div>
  );
};
