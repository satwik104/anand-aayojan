// Logo variants for AnandAyojan
// Can be used in different contexts throughout the app

export const LogoIcon = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Lotus flower - symbol of purity and celebration */}
    <ellipse cx="50" cy="75" rx="35" ry="12" fill="currentColor" opacity="0.2" />
    <path d="M 50 30 Q 45 40, 40 50 Q 35 60, 35 70 L 35 75 Q 35 78, 40 78 L 60 78 Q 65 78, 65 75 L 65 70 Q 65 60, 60 50 Q 55 40, 50 30 Z" fill="currentColor" opacity="0.6" />
    <path d="M 50 35 Q 55 42, 58 50 Q 62 58, 63 68 L 64 75 Q 64 77, 62 77 L 50 77" fill="currentColor" />
    <path d="M 50 35 Q 45 42, 42 50 Q 38 58, 37 68 L 36 75 Q 36 77, 38 77 L 50 77" fill="currentColor" />
    <path d="M 50 40 Q 60 45, 68 55 Q 72 62, 72 72 Q 72 76, 68 76 L 50 75" fill="currentColor" opacity="0.8" />
    <path d="M 50 40 Q 40 45, 32 55 Q 28 62, 28 72 Q 28 76, 32 76 L 50 75" fill="currentColor" opacity="0.8" />
    <circle cx="50" cy="65" r="8" fill="currentColor" />
    <circle cx="50" cy="30" r="4" fill="currentColor" opacity="0.6" />
  </svg>
);

export const LogoText = ({ className = "text-2xl font-bold font-serif" }: { className?: string }) => (
  <span className={className}>AnandAyojan</span>
);

export const LogoFull = ({ iconClassName, textClassName }: { iconClassName?: string; textClassName?: string }) => (
  <div className="flex items-center space-x-2">
    <LogoIcon className={iconClassName} />
    <LogoText className={textClassName} />
  </div>
);

// Alternative logo variants
export const LogoVariant2 = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Kalash (ceremonial pot) with mango leaves */}
    <ellipse cx="50" cy="85" rx="8" ry="4" fill="currentColor" />
    <path d="M 35 50 Q 35 40, 40 35 L 40 80 Q 40 85, 50 85 Q 60 85, 60 80 L 60 35 Q 65 40, 65 50 L 65 75 Q 65 82, 50 82 Q 35 82, 35 75 Z" fill="currentColor" />
    <ellipse cx="50" cy="35" rx="12" ry="6" fill="currentColor" />
    <path d="M 42 35 Q 42 28, 48 25 L 52 25 Q 58 28, 58 35" fill="currentColor" opacity="0.8" />
    {/* Coconut on top */}
    <circle cx="50" cy="22" r="7" fill="currentColor" opacity="0.9" />
    <path d="M 47 22 L 47 18 Q 47 16, 50 15 Q 53 16, 53 18 L 53 22" stroke="currentColor" strokeWidth="1.5" fill="none" />
    {/* Mango leaves */}
    <path d="M 44 25 Q 38 22, 35 18 Q 33 15, 36 14 Q 39 16, 42 20 Z" fill="currentColor" opacity="0.7" />
    <path d="M 56 25 Q 62 22, 65 18 Q 67 15, 64 14 Q 61 16, 58 20 Z" fill="currentColor" opacity="0.7" />
    <path d="M 48 24 Q 45 20, 42 15 Q 40 12, 43 12 Q 46 15, 48 19 Z" fill="currentColor" opacity="0.6" />
    <path d="M 52 24 Q 55 20, 58 15 Q 60 12, 57 12 Q 54 15, 52 19 Z" fill="currentColor" opacity="0.6" />
  </svg>
);

export const LogoVariant3 = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ghungroo/Bells - celebration music symbol */}
    <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.1" />
    {/* Main bell */}
    <path d="M 50 25 L 42 45 Q 40 50, 42 53 L 58 53 Q 60 50, 58 45 Z" fill="currentColor" />
    <ellipse cx="50" cy="53" rx="9" ry="3" fill="currentColor" opacity="0.9" />
    <circle cx="50" cy="58" r="3" fill="currentColor" />
    <path d="M 47 58 L 47 63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 50 58 L 50 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 53 58 L 53 63" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Smaller bells around */}
    <g opacity="0.8">
      <path d="M 30 40 L 26 50 Q 25 53, 26 55 L 34 55 Q 35 53, 34 50 Z" fill="currentColor" />
      <ellipse cx="30" cy="55" rx="5" ry="2" fill="currentColor" />
      <circle cx="30" cy="58" r="2" fill="currentColor" />
    </g>
    <g opacity="0.8">
      <path d="M 70 40 L 66 50 Q 65 53, 66 55 L 74 55 Q 75 53, 74 50 Z" fill="currentColor" />
      <ellipse cx="70" cy="55" rx="5" ry="2" fill="currentColor" />
      <circle cx="70" cy="58" r="2" fill="currentColor" />
    </g>
    {/* Decorative arc */}
    <path d="M 35 35 Q 50 30, 65 35" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.6" />
  </svg>
);

export default LogoFull;
