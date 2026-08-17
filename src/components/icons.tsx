import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base: P = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export const CupIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 10h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5v-5Z" />
    <path d="M16 11h1.6a2.4 2.4 0 0 1 0 4.8h-2" />
    <path d="M8 6.5c0-1.2.9-1.4.9-2.5M11.5 6.5c0-1.2.9-1.4.9-2.5" />
  </svg>
);

export const BeanIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7.1 5.9c3.4-2.8 8.4-1.6 10.5 1.6 2 3.1 1 7.9-2.4 10.7-3.4 2.8-8.4 1.6-10.5-1.6-2-3.1-1-7.9 2.4-10.7Z" />
    <path d="M8.6 6.6c2.4 2.3 2.9 4.2 2.2 6.2-.6 2 0 4 2.1 5.5" />
  </svg>
);

export const BasketIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 9.5h15l-1.4 8.7a2 2 0 0 1-2 1.8H7.9a2 2 0 0 1-2-1.8L4.5 9.5Z" />
    <path d="m8.2 9.5 3.8-6 3.8 6" />
    <path d="M9.6 13v3.5M14.4 13v3.5" />
  </svg>
);

export const PlusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 5.5v13M5.5 12h13" />
  </svg>
);

export const MinusIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5.5 12h13" />
  </svg>
);

export const TrashIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 6.5h15" />
    <path d="M9.5 6.5V4.9a1.4 1.4 0 0 1 1.4-1.4h2.2a1.4 1.4 0 0 1 1.4 1.4v1.6" />
    <path d="m6.5 6.5.8 12.2a2 2 0 0 0 2 1.8h5.4a2 2 0 0 0 2-1.8l.8-12.2" />
    <path d="M10 10.5v6M14 10.5v6" />
  </svg>
);

export const XIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 6 12 12M18 6 6 18" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15M13 5.5l6.5 6.5L13 18.5" />
  </svg>
);

export const ArrowLeftIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M19.5 12h-15M11 5.5 4.5 12 11 18.5" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="4" y="5.5" width="16" height="15" rx="2.5" />
    <path d="M4 10h16M8.5 3.5V7M15.5 3.5V7" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.2 2.7-5 5.5-5s4.9 1.8 5.5 5" />
    <circle cx="16.7" cy="9.5" r="2.4" />
    <path d="M16 14.7c2.3.4 3.8 1.9 4.4 4.2" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s6.5-5.4 6.5-10.3a6.5 6.5 0 0 0-13 0C5.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13.5" rx="2.5" />
    <path d="M3.5 10h17M7 15h4" />
  </svg>
);

export const CashIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="6.5" width="17" height="11.5" rx="2" />
    <circle cx="12" cy="12.2" r="2.6" />
    <path d="M6.6 9.6v.01M17.4 14.9v.01" />
  </svg>
);

export const WalletIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 7.5A2.5 2.5 0 0 1 7.5 5h10A1.5 1.5 0 0 1 19 6.5V8" />
    <path d="M4.5 8h13.7A2.3 2.3 0 0 1 20.5 10.3v7.2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2V8Z" />
    <path d="M15.5 13.6h5" />
  </svg>
);

export const DownloadIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 4v10M7.5 10.5 12 15l4.5-4.5" />
    <path d="M5 19.5h14" />
  </svg>
);

export const SparkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3.5v17M4.6 7.75l14.8 8.5M19.4 7.75l-14.8 8.5" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 19C5 9.5 11 4.8 19.5 4.8c0 9-5.5 14.2-14.5 14.2Z" />
    <path d="M5 19c3-5 6.5-8.4 10.5-10.4" />
  </svg>
);

export const SnowIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 2.8v18.4M4 7.4l16 9.2M20 7.4 4 16.6" />
  </svg>
);

export const PastryIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.2 11.5h11.6l-1.1 7.7a1.6 1.6 0 0 1-1.6 1.3H8.9a1.6 1.6 0 0 1-1.6-1.3l-1.1-7.7Z" />
    <path d="M5 11.5a7 7 0 0 1 14 0" />
    <path d="M12 4.5V3.2" />
  </svg>
);

export const ToastIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.7 9.2A3.4 3.4 0 0 1 6 5.1 8.6 8.6 0 0 1 12 3.2a8.6 8.6 0 0 1 6 1.9 3.4 3.4 0 0 1-.7 4.1V18a2.6 2.6 0 0 1-2.6 2.6H9.3A2.6 2.6 0 0 1 6.7 18V9.2Z" />
    <path d="M9.5 13.5c1.6-1.2 3.4-1.2 5 0" />
  </svg>
);

export const ArmchairIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6.5 10.5V7A2.5 2.5 0 0 1 9 4.5h6A2.5 2.5 0 0 1 17.5 7v3.5" />
    <path d="M4.5 13.5a2 2 0 0 1 4 0V14h7v-.5a2 2 0 0 1 4 0V17a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-3.5Z" />
    <path d="M6.5 19v1.5M17.5 19v1.5" />
  </svg>
);

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 8h12l1 11a1.8 1.8 0 0 1-1.8 2H6.8A1.8 1.8 0 0 1 5 19L6 8Z" />
    <path d="M9 10.5V6.8a3 3 0 0 1 6 0v3.7" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7.9 3.5c.6 0 1.1.4 1.3 1l.9 2.5a1.4 1.4 0 0 1-.5 1.6L8.1 9.9a12.4 12.4 0 0 0 6 6l1.3-1.5a1.4 1.4 0 0 1 1.6-.5l2.5.9c.6.2 1 .7 1 1.3v2.1a2 2 0 0 1-2.1 2A16.9 16.9 0 0 1 3.5 5.6a2 2 0 0 1 2-2.1h2.4Z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="m4.5 7.5 7.5 6 7.5-6" />
  </svg>
);

export const CameraIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="7" width="17" height="12.5" rx="2.5" />
    <circle cx="12" cy="13" r="3.4" />
    <path d="M8.5 7 10 4.5h4L15.5 7" />
  </svg>
);

export const AtIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M16 12v1.3a2.15 2.15 0 0 0 4.3 0V12a8.3 8.3 0 1 0-3.3 6.7" />
  </svg>
);

export const InfoIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 11.2V16M12 7.8v.01" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden {...p}>
    <path d="m12 3.6 2.5 5.1 5.6.8-4.1 4 1 5.6-5-2.7-5 2.7 1-5.6-4.1-4 5.6-.8L12 3.6Z" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20.5c3.6 0 6-2.5 6-5.8 0-2.5-1.4-4.2-2.7-5.8-.6 1-1.1 1.4-1.9 1.7.3-2.6-.7-5.3-2.9-7.1.1 2.2-.7 3.6-2 5C7.2 9.9 6 11.9 6 14.7c0 3.3 2.4 5.8 6 5.8Z" />
    <path d="M12 20.5c1.6 0 2.7-1.2 2.7-2.9 0-1.6-1.2-2.5-2.7-4-1.5 1.5-2.7 2.4-2.7 4 0 1.7 1.1 2.9 2.7 2.9Z" />
  </svg>
);
