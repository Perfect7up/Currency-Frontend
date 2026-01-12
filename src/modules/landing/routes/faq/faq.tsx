import { FaqAccordion, FaqCategories, FaqHero, FaqSupport } from './components';

const FAQ = () => {
  return (
    <div className="flex min-h-screen flex-col transition-colors duration-300 dark:bg-[#000513]">
      <FaqHero />
      <FaqCategories />
      <FaqAccordion />
      <FaqSupport />
    </div>
  );
};

export default FAQ;
