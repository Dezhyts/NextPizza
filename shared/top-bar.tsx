import { cn } from '@/shared/lib/utils';
import { Categories, Container, SortPopup } from '@/shared';
import { Title } from '@/shared/title';
import { Category } from '@prisma/client';

interface TopBarProps {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ categories, className }) => {
  return (
    <>
      {/* Заголовок */}
      <Container className="mt-8">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      {/* Сам TopBar с sticky */}
      <div
        className={cn(
          'sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10',
          className,
        )}
      >
        <Container className="flex items-center justify-between">
          <Categories items={categories} />
          <SortPopup />
        </Container>
      </div>
    </>
  );
};
