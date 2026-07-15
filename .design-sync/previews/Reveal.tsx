import { Reveal } from 'src';

export const Default = () => (
  <div className="p-6">
    <Reveal>
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-zinc-900">Farm Health Report</h3>
        <p className="mt-1 text-sm text-zinc-600">
          Your soil moisture levels are optimal this week.
        </p>
      </div>
    </Reveal>
  </div>
);

export const Delayed = () => (
  <div className="p-6">
    <Reveal delayMs={200}>
      <div className="rounded-2xl bg-emerald-50 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-900">Delayed reveal</h3>
        <p className="mt-1 text-sm text-emerald-700">
          Demonstrates the delayMs prop for staggered entrances.
        </p>
      </div>
    </Reveal>
  </div>
);
