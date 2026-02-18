'use client';
import { Input } from '@/shared/components/ui';
import { CheckBoxFiltersGroup, RangeSlider, Title } from '@/shared';
import { useFilterIngredients, useFilters, useURLSync } from '@/shared/hooks';
import { useState } from 'react';

interface filtersProps {
  className?: string;
}

export const Filters: React.FC<filtersProps> = () => {
  const { ingredients, loading } = useFilterIngredients();

  const [
    { pizzaTypes, selectedIngredients, sizes, prices },
    { togglePizzaType, toggleIngredient, toggleSize, setPrices },
  ] = useFilters();

  useURLSync({
    selectedIngredients,
    pizzaTypes,
    sizes,
    prices,
  });

  const items = ingredients.map((item) => ({
    value: String(item.id),
    text: item.name,
  }));

  return (
    <div>
      <Title size="sm" text="Фильтрация" className="mb-3 font-bold" />

      <CheckBoxFiltersGroup
        name="pizzaTypes"
        title="Тип теста"
        onClickCheckbox={togglePizzaType}
        selected={pizzaTypes}
        items={[
          { text: 'Тонкое', value: '1' },
          { text: 'Традиционное', value: '2' },
        ]}
      />

      <CheckBoxFiltersGroup
        name="sizes"
        title="Размер"
        className="mt-2"
        onClickCheckbox={toggleSize}
        selected={sizes}
        items={[
          { text: '20 см', value: '20' },
          { text: '30 см', value: '30' },
          { text: '40 см', value: '40' },
        ]}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold bg-3">Цена от и до</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={1000}
            value={prices.priceFrom ?? 0}
            onChange={(e) => setPrices('priceFrom', Number(e.target.value))}
          />

          <Input
            type="number"
            placeholder="1000"
            min={0}
            max={1000}
            value={prices.priceTo ?? 0}
            onChange={(e) => setPrices('priceTo', Number(e.target.value))}
          />
        </div>
        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[prices.priceFrom || 0, prices.priceTo || 1000]}
          onValueChange={([priceFrom, priceTo]) => {
            setPrices('priceFrom', priceFrom);
            setPrices('priceTo', priceTo);
          }}
        />
      </div>

      <CheckBoxFiltersGroup
        name="ingredients"
        limit={6}
        title="Ингредиенты"
        defaultItems={items.slice(0, 5)}
        items={items}
        loading={loading}
        onClickCheckbox={toggleIngredient}
        selected={selectedIngredients}
      />
    </div>
  );
};
