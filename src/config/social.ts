import {
  RiFacebookCircleLine,
  RiGithubFill,
  RiLinkedinLine,
  RiRedditLine,
  RiTwitterXFill,
  RiWhatsappLine,
} from "react-icons/ri";

import { GITHUB_REPOSITORY_URL } from "./constants";

// Social configuration constants
export const SOCIAL_SHARE_URL = typeof window !== "undefined" ? window.location.href : "";
export const SOCIAL_SHARE_TITLE = "Precise Color Clock";
export const SOCIAL_SHARE_TEXT =
  "Check out Precise Color Clock - a beautiful way to visualize time!";

export const SOCIAL_LINKS = [
  {
    href: GITHUB_REPOSITORY_URL,
    icon: RiGithubFill,
    label: "View on GitHub",
    title: "View on GitHub",
    colorClass: "text-gray-900",
    hoverColorClass: "hover:text-gray-600",
  },
  {
    href: `https://www.facebook.com/sharer/sharer.php?u=${SOCIAL_SHARE_URL}`,
    icon: RiFacebookCircleLine,
    label: "Share on Facebook",
    title: "Share on Facebook",
    colorClass: "text-blue-500",
    hoverColorClass: "hover:text-blue-600",
  },
  {
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${SOCIAL_SHARE_URL}`,
    icon: RiLinkedinLine,
    label: "Share on LinkedIn",
    title: "Share on LinkedIn",
    colorClass: "text-blue-500",
    hoverColorClass: "hover:text-blue-600",
  },
  {
    href: `https://www.reddit.com/submit?url=${SOCIAL_SHARE_URL}&title=${SOCIAL_SHARE_TEXT}`,
    icon: RiRedditLine,
    label: "Share on Reddit",
    title: "Share on Reddit",
    colorClass: "text-orange-500",
    hoverColorClass: "hover:text-orange-600",
  },
  {
    href: `https://wa.me/?text=${SOCIAL_SHARE_TEXT} ${SOCIAL_SHARE_URL}`,
    icon: RiWhatsappLine,
    label: "Share on WhatsApp",
    title: "Share on WhatsApp",
    colorClass: "text-green-500",
    hoverColorClass: "hover:text-green-600",
  },
  {
    href: `https://x.com/intent/tweet?url=${SOCIAL_SHARE_URL}&text=${SOCIAL_SHARE_TEXT}`,
    icon: RiTwitterXFill,
    label: "Share on X",
    title: "Share on X",
    colorClass: "text-blue-500",
    hoverColorClass: "hover:text-blue-600",
  },
];
