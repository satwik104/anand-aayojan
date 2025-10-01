// Logo variants for AnandAyojan
// Can be used in different contexts throughout the app

export const LogoIcon = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Diya/Lamp icon representing celebration and auspiciousness */}
    <circle cx="50" cy="35" r="25" fill="currentColor" opacity="0.2" />
    <path
      d="M 30 35 Q 30 25, 50 25 Q 70 25, 70 35 Q 70 50, 50 55 Q 30 50, 30 35 Z"
      fill="currentColor"
    />
    <ellipse cx="50" cy="35" rx="15" ry="8" fill="currentColor" opacity="0.8" />
    <path d="M 48 25 Q 50 15, 52 25" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="50" cy="20" r="3" fill="currentColor" />
    <rect x="45" y="55" width="10" height="20" rx="2" fill="currentColor" />
    <path d="M 40 75 L 60 75 L 58 80 L 42 80 Z" fill="currentColor" />
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
    {/* Mandap/Stage icon */}
    <path d="M 20 80 L 20 40 L 50 30 L 80 40 L 80 80" stroke="currentColor" strokeWidth="3" fill="none" />
    <path d="M 30 40 L 30 80" stroke="currentColor" strokeWidth="2" />
    <path d="M 50 35 L 50 80" stroke="currentColor" strokeWidth="2" />
    <path d="M 70 40 L 70 80" stroke="currentColor" strokeWidth="2" />
    <path d="M 25 50 L 75 50" stroke="currentColor" strokeWidth="2" />
    <circle cx="50" cy="25" r="5" fill="currentColor" />
    <path d="M 50 25 L 45 35 L 55 35 Z" fill="currentColor" />
    <path d="M 15 80 L 85 80" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const LogoVariant3 = ({ className = "h-10 w-10" }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Floral/Rangoli pattern */}
    <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="50" cy="50" r="8" fill="currentColor" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
      const radian = (angle * Math.PI) / 180;
      const x = 50 + 20 * Math.cos(radian);
      const y = 50 + 20 * Math.sin(radian);
      return (
        <g key={i}>
          <circle cx={x} cy={y} r="6" fill="currentColor" opacity="0.8" />
          <path
            d={`M 50 50 Q ${50 + 15 * Math.cos(radian)} ${50 + 15 * Math.sin(radian)}, ${x} ${y}`}
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      );
    })}
  </svg>
);

export default LogoFull;
