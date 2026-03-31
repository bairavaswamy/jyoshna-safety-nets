// Define what the object looks like
interface SportsImages {
  [key: string]: string[]; // Any string key will return an array of strings
}

export const images: SportsImages= {
  "invisible-grills": [
    "/invisble-grills-installation.webp",
    "/invisible-grills-for-balcony.webp",
    "/top-rated-invisible-grills.webp",
  ],

  "balcony-safety-nets": [
    "/balcony-1.webp",
    "/balcony-5.webp",
    "/cards/balcony-safety-nets-near-me.webp",
    "/balcony-7.webp",
    "/balcony-safety-nets.webp",
    // "/images/balcony-safety-nets-protection.webp",
    // "/images/balcony-safety-nets-secure.webp",
  ],

  "pigeon-safety-nets": [
    "/transparabt-net-installation.webp",
    "/transparent-net-installation-near-me.webp",
    "/balcony-9.webp",
   
  ],

  "anti-bird-nets": [
    "/anti-bird-nets-installation.webp",
    "/building-covering-safety-net.webp",
    "/balcony-6.webp",
  ],

  "duct-area-safety-nets": [
    "/duct-area.webp",
    "/cards/duct-area-safety-nets-near-me.webp",
  ],

  "safety-net-installation": [
    "/safety-nets-installation.webp",
    "/monkey-safety-nets.webp",
    "/cards/balcony-safety-nets-near-me.webp",
  ],

  "windows-safety-nets": [
    "/window-safety-nets-installation.webp",
    "/anti-bird-nets-installation.webp",
  ],


  "monkey-safety-nets": [
    "/monkey-safety-nets.webp",
    
  ],

  "sports-nets": [
    "/sports-nets-installation.webp",
    "/sports-nets-installation-near-me.webp",
  ],

  "children-safety-nets": [
    "/cards/balcony-safety-nets-near-me.webp",
    "/balcony-safety-nets.webp",
   
  ],
}as const;

