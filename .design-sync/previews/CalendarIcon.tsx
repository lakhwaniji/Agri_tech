import { CalendarIcon } from 'src';

export const Default = () => (
  <div className="p-6">
    <CalendarIcon />
  </div>
);

export const Tile = () => (
  <div className="p-6">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      <CalendarIcon className="h-9 w-9" />
    </div>
  </div>
);
