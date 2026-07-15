import { Logo } from 'src';

export const Default = () => (
  <div className="p-6">
    <Logo />
  </div>
);

export const Large = () => (
  <div className="p-6">
    <Logo className="h-16 w-auto" />
  </div>
);
