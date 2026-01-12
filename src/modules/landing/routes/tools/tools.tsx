import { CoinComparator, CurrencyConverter, ToolsHero } from './components';

const Tools = () => {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#000513]">
      <ToolsHero />
      <section className="flex flex-col items-center px-4 py-16">
        <CurrencyConverter />
      </section>
      <section className="flex flex-col items-center px-4 py-16 pb-32">
        <CoinComparator />
      </section>
    </main>
  );
};

export default Tools;
