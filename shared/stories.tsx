'use client';
import { Container } from '@/shared/container';
import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { IStory } from '@/shared/services/stories';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactStories from 'react-insta-stories';

interface StoriesProps {
  className?: string;
}

export const Stories = ({ className }: StoriesProps) => {
  const [stories, setStories] = useState<IStory[]>([]); // list stories
  const [selectedStory, setSelectedStory] = useState<IStory>(); // selected stories
  const [open, setOpen] = useState(false); // open modal

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  return (
    <Container
      className={cn('flex items-center justify-between  my-10', className)}
    >
      {stories.length === 0 &&
        [...Array(6)].map((_, index) => (
          <div
            key={index}
            className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
          />
        ))}

      {stories.map((story) => (
        <img
          key={story.id}
          className="rounded-md cursor-pointer"
          onClick={() => onClickStory(story)}
          height={250}
          width={200}
          src={story.previewImageUrl}
        />
      ))}

      {open && (
        <div
          className="flex gap-2 justify-between  items-center z-30 w-full h-full bg-black/80 fixed left-0 top-0"
          onClick={handleOverlayClick}
        >
          <div className="relative" style={{ width: 520 }}>
            <button
              className="absolute -right-10 -top-5 z-30"
              onClick={() => setOpen(false)}
            >
              <X className="absolute top-0 right-0 w-8 h-8 text-white/50" />
            </button>

            <ReactStories
              stories={
                selectedStory?.items.map((item) => ({ url: item.sourceUrl })) ||
                []
              }
              width={520}
              height={800}
              defaultInterval={3000}
              onAllStoriesEnd={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
