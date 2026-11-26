import { useId } from 'react';
import { COVER_THEMES } from '../data/initialBooks';
import { BookCategory, CoverMotifId, CoverThemeId } from '../types/library';

interface BookCoverProps {
  title: string;
  author: string;
  category: BookCategory | string;
  coverTheme: CoverThemeId;
  coverMotif: CoverMotifId;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BookCover({
  title,
  author,
  category,
  coverTheme,
  coverMotif,
  size = 'md',
  className = '',
}: BookCoverProps) {
  const uid = useId().replace(/:/g, '');
  const theme = COVER_THEMES[coverTheme] ?? COVER_THEMES.emerald;
  const gradId = `cover-grad-${uid}`;
  const patternId = `cover-pat-${uid}`;

  const titleClasses =
    size === 'sm'
      ? 'text-[11px] leading-tight line-clamp-3'
      : size === 'lg'
        ? 'text-xl sm:text-2xl leading-snug line-clamp-4'
        : 'text-base leading-snug line-clamp-3';

  const paddingClasses =
    size === 'sm' ? 'p-2.5 pl-3.5' : size === 'lg' ? 'p-6 pl-8' : 'p-4 pl-5';

  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-r-lg rounded-l-sm shadow-sm select-none ${className}`}
      style={{
        background: `linear-gradient(145deg, ${theme.gradientFrom} 0%, ${theme.gradientTo} 100%)`,
      }}
      aria-label={`Sampul buku ${title} oleh ${author}`}
    >
      {/* SVG Illustration & Motif Layer */}
      <svg
        viewBox="0 0 300 400"
        className="absolute inset-0 h-full w-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.gradientFrom} />
            <stop offset="100%" stopColor={theme.gradientTo} />
          </linearGradient>
          <pattern id={patternId} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill={theme.accentHex} fillOpacity="0.12" />
          </pattern>
        </defs>

        <rect width="300" height="400" fill={`url(#${gradId})`} />
        <rect width="300" height="400" fill={`url(#${patternId})`} />

        {/* Motif Illustrations */}
        {coverMotif === 'archipelago' && (
          <g fill="none" stroke={theme.accentHex} strokeOpacity="0.22" strokeWidth="1.5">
            <path d="M-20 260 Q 75 210 150 260 T 320 260" />
            <path d="M-20 290 Q 75 240 150 290 T 320 290" />
            <path d="M-20 320 Q 75 270 150 320 T 320 320" />
            <circle cx="220" cy="110" r="46" strokeOpacity="0.18" />
            <circle cx="220" cy="110" r="28" fill={theme.accentHex} fillOpacity="0.08" stroke="none" />
          </g>
        )}

        {coverMotif === 'botanical' && (
          <g fill="none" stroke={theme.accentHex} strokeOpacity="0.24" strokeWidth="1.5">
            <path d="M150 380 C 150 270, 210 210, 260 130" />
            <path d="M168 295 C 215 280, 245 245, 255 205 C 215 215, 185 250, 168 295 Z" fill={theme.accentHex} fillOpacity="0.08" />
            <path d="M160 250 C 115 235, 90 195, 85 155 C 120 170, 145 210, 160 250 Z" fill={theme.accentHex} fillOpacity="0.06" />
            <rect x="28" y="28" width="244" height="344" rx="4" strokeOpacity="0.14" />
          </g>
        )}

        {coverMotif === 'compass' && (
          <g fill="none" stroke={theme.accentHex} strokeOpacity="0.22" strokeWidth="1.4">
            <circle cx="160" cy="220" r="95" />
            <circle cx="160" cy="220" r="68" strokeDasharray="4 6" />
            <line x1="160" y1="105" x2="160" y2="335" strokeOpacity="0.16" />
            <line x1="45" y1="220" x2="275" y2="220" strokeOpacity="0.16" />
            <polygon
              points="160,152 174,220 160,288 146,220"
              fill={theme.accentHex}
              fillOpacity="0.1"
            />
          </g>
        )}

        {coverMotif === 'cosmos' && (
          <g fill="none" stroke={theme.accentHex} strokeOpacity="0.22" strokeWidth="1.4">
            <ellipse cx="160" cy="200" rx="115" ry="44" transform="rotate(-24 160 200)" />
            <ellipse cx="160" cy="200" rx="115" ry="44" transform="rotate(24 160 200)" />
            <circle cx="160" cy="200" r="32" fill={theme.accentHex} fillOpacity="0.1" />
            <circle cx="232" cy="148" r="5" fill={theme.accentHex} fillOpacity="0.35" stroke="none" />
            <circle cx="88" cy="248" r="4" fill={theme.accentHex} fillOpacity="0.3" stroke="none" />
          </g>
        )}

        {coverMotif === 'songket' && (
          <g fill="none" stroke={theme.accentHex} strokeOpacity="0.22" strokeWidth="1.4">
            <polygon points="160,115 240,200 160,285 80,200" />
            <polygon points="160,145 212,200 160,255 108,200" fill={theme.accentHex} fillOpacity="0.07" />
            <polygon points="160,172 186,200 160,228 134,200" />
            <line x1="30" y1="54" x2="270" y2="54" strokeOpacity="0.25" />
            <line x1="30" y1="346" x2="270" y2="346" strokeOpacity="0.25" />
          </g>
        )}

        {/* Book Spine Groove */}
        <rect x="0" y="0" width="12" height="400" fill="#000000" fillOpacity="0.24" />
        <line x1="13" y1="0" x2="13" y2="400" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1" />
      </svg>

      {/* Typography Overlay */}
      <div className={`relative z-10 flex h-full flex-col justify-between ${paddingClasses}`}>
        <div>
          {size !== 'sm' && (
            <p
              className="text-[10px] font-semibold tracking-[0.14em] uppercase opacity-90"
              style={{ color: theme.mutedColor }}
            >
              {category}
            </p>
          )}
          <div
            className={`${size === 'sm' ? 'mt-0.5' : 'mt-3'} font-serif font-semibold tracking-tight ${titleClasses}`}
            style={{ color: theme.textColor }}
          >
            {title}
          </div>
        </div>

        <div className="pt-2">
          {size !== 'sm' && (
            <div
              className="mb-2 h-px w-8 opacity-45"
              style={{ backgroundColor: theme.accentHex }}
            />
          )}
          <p
            className={`${size === 'sm' ? 'text-[9px] truncate' : 'text-xs truncate'} font-medium opacity-90`}
            style={{ color: theme.mutedColor }}
          >
            {author}
          </p>
        </div>
      </div>
    </div>
  );
}
