import { useState } from 'react';
import { FeaturedNews, NewsHero, NewsListing, NewsReaderModal } from './components';

const News = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  return (
    <>
      <NewsHero />
      <FeaturedNews onReadMore={(id) => setSelectedId(id)} />

      <NewsListing onArticleClick={(id) => setSelectedId(id)} />

      <NewsReaderModal
        articleId={selectedId}
        isVisible={!!selectedId}
        onClose={() => setSelectedId(null)}
      />
    </>
  );
};

export default News;
