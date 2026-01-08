import { CoinComparator } from './components/coin-comparator';
import { CurrencyConverter } from './components/currency-converter';
import ToolsHero from './components/tools-hero-section';

const Tools = () => {
  return (
    <main className="min-h-screen bg-white transition-colors duration-300 dark:bg-[#000513]">
      <ToolsHero />

      {/* Each section is a flex container to ensure centering */}
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
