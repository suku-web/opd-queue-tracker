// Small monoline icon set. Replaces emoji across the app.
// All icons share stroke="currentColor" so they inherit text color.

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconCross = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3v7M12 14v7M3 12h7M14 12h7" />
  </svg>
);

export const IconUsers = (props) => (
  <svg {...base} {...props}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <circle cx="17" cy="9" r="2.4" />
    <path d="M15.5 14c2.5.3 4.5 2.5 4.5 5" />
  </svg>
);

export const IconClock = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </svg>
);

export const IconMail = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M4 6.5l8 6 8-6" />
  </svg>
);

export const IconLock = (props) => (
  <svg {...base} {...props}>
    <rect x="4.5" y="10.5" width="15" height="10" rx="1.5" />
    <path d="M7.5 10.5V7.5a4.5 4.5 0 0 1 9 0v3" />
  </svg>
);

export const IconCheck = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12.5l5.5 5.5L20 6" />
  </svg>
);

export const IconArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
);

export const IconPin = (props) => (
  <svg {...base} {...props}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const IconAmbulance = (props) => (
  <svg {...base} {...props}>
    <rect x="2" y="8" width="13" height="9" rx="1" />
    <path d="M15 11h4l3 3v3h-7z" />
    <circle cx="7" cy="19" r="1.7" />
    <circle cx="17.5" cy="19" r="1.7" />
    <path d="M6.5 11v3M5 12.5h3" />
  </svg>
);