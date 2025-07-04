export interface SocialLinkProps {
  colorClass: string;
  hoverColorClass: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  title: string;
}
