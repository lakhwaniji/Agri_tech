// Module catalogue shared by the farmer Home screen and the farmer app shell
// (sidebar, bottom nav and the all-services menu).
import type { TranslationKey } from "@/lib/i18n/translations";
import {
  BasketIcon,
  CarbonCreditIcon,
  CropHealthIcon,
  CropInsuranceIcon,
  CropLoanIcon,
  DroneIcon,
  ExpertIcon,
  FarmGateIcon,
  FingerprintIcon,
  GovernmentIcon,
  GraduationIcon,
  GroupIcon,
  HealthInsuranceIcon,
  IrrigationIcon,
  MapPinIcon,
  MarketplaceIcon,
  MoneyTransferIcon,
  NewsIcon,
  PriceTagIcon,
  QuickLoanIcon,
  RadioIcon,
  ReceiptIcon,
  SatelliteIcon,
  ShoppingBagIcon,
  SoilIcon,
  SolarPanelIcon,
  TractorIcon,
  TruckIcon,
  WalletIcon,
  WarehouseIcon,
  WeatherIcon,
  WrenchIcon,
  FarmManagementIcon,
} from "@/components/icons";

export type IconComponent = typeof FarmGateIcon;

export const ACTIVE_MODULES: {
  labelKey: TranslationKey;
  Icon: IconComponent;
  tile: string;
  href?: string;
}[] = [
  { labelKey: "modules.farmgate",     Icon: FarmGateIcon,   tile: "bg-emerald-100 text-emerald-700", href: "/farmgate" },
  { labelKey: "modules.cropAdvisory", Icon: CropHealthIcon,  tile: "bg-lime-100 text-lime-700",       href: "/crop-advisory" },
  { labelKey: "modules.marketplace",  Icon: MarketplaceIcon, tile: "bg-amber-100 text-amber-700",     href: "/marketplace" },
  { labelKey: "modules.wallet",       Icon: WalletIcon,      tile: "bg-blue-100 text-blue-700",       href: "/wallet" },
  { labelKey: "modules.weather",      Icon: WeatherIcon,     tile: "bg-sky-100 text-sky-700" },
  { labelKey: "modules.loanChecker",  Icon: QuickLoanIcon,   tile: "bg-purple-100 text-purple-700" },
];

export const FINTECH_MODULES: { label: string; Icon: IconComponent }[] = [
  { label: "Crop Loan",         Icon: CropLoanIcon },
  { label: "Tractor Loan",      Icon: TractorIcon },
  { label: "Equipment Loan",    Icon: WrenchIcon },
  { label: "Solar Loan",        Icon: SolarPanelIcon },
  { label: "Education Loan",    Icon: GraduationIcon },
  { label: "Aadhaar Pay",       Icon: FingerprintIcon },
  { label: "Bill Payments",     Icon: ReceiptIcon },
  { label: "Crop Insurance",    Icon: CropInsuranceIcon },
  { label: "Health Insurance",  Icon: HealthInsuranceIcon },
  { label: "Money Transfer",    Icon: MoneyTransferIcon },
];

export const AGRITECH_MODULES: { label: string; Icon: IconComponent; href?: string }[] = [
  { label: "Soil Health",       Icon: SoilIcon },
  { label: "Farm Mapping",      Icon: MapPinIcon },
  { label: "Drone Services",    Icon: DroneIcon },
  { label: "Irrigation Mgmt",  Icon: IrrigationIcon },
  { label: "Yield Prediction",  Icon: FarmManagementIcon },
  { label: "Mandi Prices",      Icon: PriceTagIcon },
  { label: "Satellite Monitor", Icon: SatelliteIcon },
  { label: "Expert Connect",    Icon: ExpertIcon },
  { label: "FPO Connect",       Icon: GroupIcon },
  { label: "PM-KISAN",          Icon: GovernmentIcon },
  { label: "Carbon Credits",    Icon: CarbonCreditIcon, href: "/carbon" },
  { label: "Agri News",         Icon: NewsIcon },
];

export const SERVICES_MODULES: { label: string; Icon: IconComponent }[] = [
  { label: "Tractor Rental",   Icon: TractorIcon },
  { label: "Drone Rental",     Icon: DroneIcon },
  { label: "Equipment Rental", Icon: WrenchIcon },
  { label: "Input Shop",       Icon: ShoppingBagIcon },
  { label: "Produce Selling",  Icon: BasketIcon },
  { label: "Agri Radio",       Icon: RadioIcon },
  { label: "Warehouse",        Icon: WarehouseIcon },
  { label: "Transport",        Icon: TruckIcon },
];

export const SHEET_SECTIONS: { title: string; tile: string; modules: { label: string; Icon: IconComponent; href?: string }[] }[] = [
  { title: "Fintech",  tile: "bg-blue-50 text-blue-700",     modules: FINTECH_MODULES },
  { title: "Agritech", tile: "bg-green-50 text-green-700",   modules: AGRITECH_MODULES },
  { title: "Services", tile: "bg-orange-50 text-orange-700", modules: SERVICES_MODULES },
];

