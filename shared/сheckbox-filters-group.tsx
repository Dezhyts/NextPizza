'use client';

import { Input, Skeleton } from '@/shared/components/ui';
import { FilterCheckbox, FilterCheckboxProps } from '@/shared/filter-checkbox';
import { ChangeEvent, useState } from 'react';

type Item = FilterCheckboxProps;

interface CheckBoxFiltersGroupProps {
  className?: string;
  title: string;
  items: Item[]; // весь список
  defaultItems?: Item[]; // нераскрытый список
  limit?: number;
  searchInputPlaceholder?: string; // поиск по чекбоксам
  onClickCheckbox?: (id: string) => void;
  defaultValue?: string[]; // какие выбраны
  loading?: boolean;
  selected?: Set<string>;
  name?: string;
}
export const CheckBoxFiltersGroup: React.FC<CheckBoxFiltersGroupProps> = ({
  className,
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Поиск...',
  loading,
  onClickCheckbox,
  selected,
  name,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const list = showAll
    ? items.filter((item) =>
        item.text.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()),
      )
    : (defaultItems || items).slice(0, limit);

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {Array.from({ length: limit }).map((_, index) => (
          <Skeleton key={index} className="h-6 mb-4 rounded-[8px] " />
        ))}
        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>
      {showAll && (
        <Input
          type="text"
          value={searchValue}
          onChange={onChangeSearchInput}
          placeholder={searchInputPlaceholder}
          className="bg-gray-50 border-none mb-4 "
        />
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item, index) => (
          <FilterCheckbox
            key={index}
            text={item.text}
            value={item.value}
            checked={selected ? selected.has(item.value) : false}
            endAdornment={item.endAdornment}
            onCheckedChange={() => onClickCheckbox?.(item.value)}
            name={name}
          />
        ))}
      </div>
      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button
            onClick={() => setShowAll(!showAll)}
            className=" text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};
