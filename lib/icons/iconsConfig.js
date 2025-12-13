"use client";

// lib/icons/iconsConfig.js
import dynamic from "next/dynamic";

// 🧩 Small fallback (shows while icon is loading)
const loader = () => (
  <span
    style={{
      display: "block",
      width: 24,
      height: 24,
      borderRadius: 4,
      background: "rgba(255, 255, 255, 0.1)",
    }}
  />
);

//  Helper for cleaner syntax
const lazy = (importFn) => dynamic(importFn, { ssr: false, loading: loader });

export const iconsConfig = {
  // MUI icons
  keyless: lazy(() => import("@mui/icons-material/KeyOff")),
  fingerprint: lazy(() => import("@mui/icons-material/Fingerprint")),
  twoEndsArrow: lazy(() => import("@mui/icons-material/SwapCalls")),
  apple: lazy(() => import("@mui/icons-material/Apple")),
  support: lazy(() => import("@mui/icons-material/SupportAgent")),
  questionAndAnswer: lazy(() => import("@mui/icons-material/QuestionAnswer")),
  rightAngle: lazy(() => import("@mui/icons-material/ChevronRight")),
  angleDown: lazy(() => import("@mui/icons-material/KeyboardArrowDown")),
  dashboard: lazy(() => import("@mui/icons-material/Dashboard")),
  dashboard: lazy(() => import("@mui/icons-material/Dashboard")),
  hamburger: lazy(() => import("@mui/icons-material/Menu")),
  close: lazy(() => import("@mui/icons-material/Close")),
  transaction: lazy(() => import("@mui/icons-material/Repeat")),
  invest: lazy(() => import("@mui/icons-material/Paid")),
  plans: lazy(() => import("@mui/icons-material/CurrencyExchange")),
  user: lazy(() => import("@mui/icons-material/Person")),
  share: lazy(() => import("@mui/icons-material/Share")),
  verifyUser: lazy(() => import("@mui/icons-material/HowToReg")),
  warning: lazy(() => import("@mui/icons-material/Warning")),
  info: lazy(() => import("@mui/icons-material/ErrorOutline")),
  accountBalance: lazy(() =>
    import("@mui/icons-material/AccountBalanceWallet")
  ),
  arrowRight: lazy(() => import("@mui/icons-material/East")),
  arrowIn: lazy(() => import("@mui/icons-material/CallReceived")),
  arrowOut: lazy(() => import("@mui/icons-material/NorthEast")),
  plus: lazy(() => import("@mui/icons-material/Add")),
  minus: lazy(() => import("@mui/icons-material/Remove")),
  arrowForward: lazy(() => import("@mui/icons-material/ArrowForwardIos")),
  link: lazy(() => import("@mui/icons-material/Link")),
  copy: lazy(() => import("@mui/icons-material/ContentCopy")),
  search: lazy(() => import("@mui/icons-material/Search")),
  locked: lazy(() => import("@mui/icons-material/Lock")),
  arrowBack: lazy(() => import("@mui/icons-material/ArrowBack")),
  checkCircle: lazy(() => import("@mui/icons-material/CheckCircle")),
  passport: lazy(() => import("@mui/icons-material/ContactPage")),
  idCard: lazy(() => import("@mui/icons-material/BrandingWatermark")),
  driversLicense: lazy(() => import("@mui/icons-material/LocalPolice")),
  profile: lazy(() => import("@mui/icons-material/AccountCircle")),
  logout: lazy(() => import("@mui/icons-material/Logout")),

  security: lazy(() => import("@mui/icons-material/Security")),
  eye: lazy(() => import("@mui/icons-material/RemoveRedEye")),
  email: lazy(() => import("@mui/icons-material/Email")),
  eyeOff: lazy(() => import("@mui/icons-material/VisibilityOff")),
  overview: lazy(() => import("@mui/icons-material/UnfoldLess")),
  makeAdmin: lazy(() => import("@mui/icons-material/AdminPanelSettings")),
  home: lazy(() => import("@mui/icons-material/Home")),
  settings: lazy(() => import("@mui/icons-material/Settings")),
  edit: lazy(() => import("@mui/icons-material/Edit")),
};

