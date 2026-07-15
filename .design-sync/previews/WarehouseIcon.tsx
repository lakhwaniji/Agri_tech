import { WarehouseIcon } from 'src';

export const Default = () => (
  <div className="p-6">
    <WarehouseIcon />
  </div>
);

export const Tile = () => (
  <div className="p-6">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
      <WarehouseIcon className="h-9 w-9" />
    </div>
  </div>
);
