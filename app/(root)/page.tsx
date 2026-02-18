import { Container, Filters, ProductsGroupList, TopBar,Stories } from '@/shared';
import { findPizzas, GetSearchParams } from '@/shared/lib/find-pizzas';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<GetSearchParams>;
}) {
  const props = await searchParams;
  const categories = await findPizzas(props);

  return (
    <>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0,
        )}
      />

      <Stories />

      <Container className=" mt-10 pb-14">
        <div className=" flex gap-[80px]">
          <div className="w-[250px]">
            <Suspense fallback={<div>Загрузка фильтров...</div>}>
              <Filters />
            </Suspense>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-20">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
