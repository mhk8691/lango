import { useId } from "react";

/** A vector illustration stays sharp on phones and large displays. */
export default function PlacementIllustration() {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 480 340" fill="none" role="img" aria-labelledby={`${id}-title`} style={{ display: "block", width: "100%", height: "auto" }}>
      <title id={`${id}-title`}>نمودار رشد مهارت زبان و ذره‌بین با علامت تأیید</title>
      <defs>
        <linearGradient id={`${id}-blue`} x1="116" y1="215" x2="156" y2="294" gradientUnits="userSpaceOnUse"><stop stopColor="#58B7FF" /><stop offset="1" stopColor="#075FFF" /></linearGradient>
        <linearGradient id={`${id}-gold`} x1="185" y1="171" x2="218" y2="291" gradientUnits="userSpaceOnUse"><stop stopColor="#FFD981" /><stop offset="1" stopColor="#FFB52C" /></linearGradient>
        <linearGradient id={`${id}-mint`} x1="245" y1="117" x2="288" y2="296" gradientUnits="userSpaceOnUse"><stop stopColor="#A0E3CC" /><stop offset="1" stopColor="#55BFA0" /></linearGradient>
        <linearGradient id={`${id}-green`} x1="316" y1="213" x2="355" y2="270" gradientUnits="userSpaceOnUse"><stop stopColor="#38D69B" /><stop offset="1" stopColor="#0AAB73" /></linearGradient>
        <filter id={`${id}-shadow`} x="0" y="0" width="480" height="340" filterUnits="userSpaceOnUse"><feGaussianBlur stdDeviation="9" /></filter>
      </defs>
      <path d="M113 162c-18-21 11-47 36-67l28-24c16-14 43-11 49 10 7 25-16 39-36 57-24 22-56 47-77 24Z" fill="#E5F5EF" />
      <path d="M273 169c-16-23 10-41 37-51 24-10 43-30 62-16 15 11 8 33-5 43-30 21-78 46-94 24Z" fill="#F1F7FD" />
      <path d="M76 281v-26c0-38 16-50 33-50 24 0 34 17 34 50v26H76Z" fill="#EAF3FD" />
      <path d="M351 282v-53c0-26 11-45 33-45s30 19 30 45v53h-63Z" fill="#EAF3FD" />
      <path d="M307 282v-78c0-26 10-39 28-39 24 0 30 19 30 39v78h-58Z" fill="#F0F7FE" />
      <ellipse cx="245" cy="290" rx="133" ry="10" fill="#B8D7E8" opacity=".24" filter={`url(#${id}-shadow)`} />
      <rect x="129" y="221" width="51" height="65" rx="13" fill={`url(#${id}-blue)`} />
      <path d="M139 236c0-5 3-8 7-8" stroke="#A3D9FF" strokeWidth="4" strokeLinecap="round" />
      <rect x="188" y="181" width="51" height="105" rx="13" fill={`url(#${id}-gold)`} />
      <path d="M198 199c0-5 3-9 7-9" stroke="#FFE8B6" strokeWidth="4" strokeLinecap="round" />
      <path d="m232 182-14 15v89h9a12 12 0 0 0 12-12v-80c0-5-3-10-7-12Z" fill="#E99D30" opacity=".25" />
      <rect x="247" y="132" width="51" height="154" rx="13" fill={`url(#${id}-mint)`} />
      <path d="M257 149c0-5 3-9 7-9" stroke="#C0F1DF" strokeWidth="4" strokeLinecap="round" />
      <path d="M298 145v128c0 7-6 13-13 13h-8V145c0-6 4-11 9-12 7 0 12 5 12 12Z" fill="#40A98F" opacity=".18" />
      <path d="m353 264 18 26" stroke="#FFBD43" strokeWidth="13" strokeLinecap="round" />
      <path d="m353 264 9 13" stroke="#FFA83B" strokeWidth="13" strokeLinecap="round" />
      <circle cx="331" cy="238" r="39" fill="white" />
      <circle cx="331" cy="238" r="32" fill={`url(#${id}-green)`} />
      <path d="m316 238 10 10 20-22" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="119" cy="189" r="4" fill="#C2DCF7" />
      <path d="M325 101v12m-6-6h12" stroke="#BDDCCC" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
