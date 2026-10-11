"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Location01Icon,
  Globe02Icon,
  Share01Icon,
  DatabaseIcon,
  SparklesIcon,
  Calendar01Icon,
  StarIcon,
  Upload01Icon,
  Download01Icon,
  Delete02Icon,
  Cancel01Icon,
  CheckmarkCircle01Icon,
  ZoomInAreaIcon,
  ZoomOutAreaIcon,
  RotateLeft01Icon,
  UserIcon,
  FavouriteIcon,
  Alert02Icon,
  Restaurant01Icon,
  ArrowUpRight01Icon,
  Loading03Icon,
  TranslateIcon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";

type IconDef = React.ComponentProps<typeof HugeiconsIcon>["icon"];

function createIcon(iconDef: IconDef) {
  return function IconWrapper({ size = 20, className = "", ...props }: Omit<React.ComponentProps<typeof HugeiconsIcon>, "icon">) {
    return (
      <HugeiconsIcon
        icon={iconDef}
        size={size}
        className={className}
        {...props}
      />
    );
  };
}

export const SearchIcon = createIcon(Search01Icon);
export const MapPinIcon = createIcon(Location01Icon);
export const GlobeIcon = createIcon(Globe02Icon);
export const ShareIcon = createIcon(Share01Icon);
export const DatabaseIconComp = createIcon(DatabaseIcon);
export const SparklesIconComp = createIcon(SparklesIcon);
export const CalendarIcon = createIcon(Calendar01Icon);
export const StarIconComp = createIcon(StarIcon);
export const UploadIcon = createIcon(Upload01Icon);
export const DownloadIcon = createIcon(Download01Icon);
export const DeleteIcon = createIcon(Delete02Icon);
export const CloseIcon = createIcon(Cancel01Icon);
export const CheckIcon = createIcon(CheckmarkCircle01Icon);
export const ZoomInIcon = createIcon(ZoomInAreaIcon);
export const ZoomOutIcon = createIcon(ZoomOutAreaIcon);
export const ResetIcon = createIcon(RotateLeft01Icon);
export const UserIconComp = createIcon(UserIcon);
export const HeartIcon = createIcon(FavouriteIcon);
export const WarningIcon = createIcon(Alert02Icon);
export const FoodIcon = createIcon(Restaurant01Icon);
export const ArrowUpRightIcon = createIcon(ArrowUpRight01Icon);
export const SpinnerIcon = createIcon(Loading03Icon);
export const LanguageIcon = createIcon(TranslateIcon);
export const InfoIcon = createIcon(InformationCircleIcon);
