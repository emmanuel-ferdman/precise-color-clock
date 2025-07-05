import { RiInformationLine, RiShareLine } from "react-icons/ri";

import { ColorSpace3D } from "@/components";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { GITHUB_PROFILE_URL } from "@/config/constants";
import {
  SOCIAL_SHARE_URL,
  SOCIAL_SHARE_TEXT,
  SOCIAL_SHARE_TITLE,
  SOCIAL_LINKS,
} from "@/config/social";
import { ColorMode } from "@/types/color";
import { SocialLinkProps } from "@/types/social";

function SocialLink({
  href,
  icon: Icon,
  label,
  title,
  colorClass,
  hoverColorClass,
}: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${colorClass} ${hoverColorClass} transition-colors`}
      title={title}
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}

interface AboutDialogProps {
  color: string;
  colorMode: ColorMode;
}

export function AboutDialog({ color, colorMode }: AboutDialogProps) {
  const handleShareClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator
      .share({
        title: SOCIAL_SHARE_TITLE,
        text: SOCIAL_SHARE_TEXT,
        url: SOCIAL_SHARE_URL,
      })
      .catch(console.error);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Open info dialog">
          <RiInformationLine className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw]">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Precise Color Clock</DialogTitle>
          <DialogDescription className="sr-only">
            Learn about the Precise Color Clock app and how it converts time into beautiful colors.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <p className="text-base text-center text-muted-foreground">
            This app converts the time into a unique background using your chosen color space. Turn
            every second into a splash of color!
            <br />
            After all, time shouldn&apos;t just fly – it should{" "}
            <span style={{ color: color, fontWeight: 600 }}>glow</span>.
          </p>
          <ColorSpace3D colorMode={colorMode} />
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4 items-center justify-center mt-2">
              {SOCIAL_LINKS.map((link, index) => (
                <SocialLink key={index} {...link} />
              ))}
              <button
                type="button"
                onClick={handleShareClick}
                aria-label="Share..."
                className="text-gray-500 hover:text-gray-600 transition-colors"
                title="Share..."
              >
                <RiShareLine className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-center text-muted-foreground mt-4">
              Created with <span className="text-pink-500">❤️</span> by{" "}
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Emmanuel Ferdman's profile"
                className="text-blue-500 hover:text-blue-600 transition-colors underline underline-offset-2 ml-1"
                title="Visit Emmanuel Ferdman's profile"
              >
                Emmanuel Ferdman
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
