import { Color } from "@lib/types/";
import { Colors } from "./theme.constants";

export const TextColorMap: Record<Color, string> = {
  [Colors.BACKGROUND]: "text-background",
  [Colors.FOREGROUND]: "text-foreground",
  [Colors.CARD]: "text-card",
  [Colors.CARD_FOREGROUND]: "text-card-foreground",
  [Colors.POPOVER]: "text-popover",
  [Colors.POPOVER_FOREGROUND]: "text-popover-foreground",
  [Colors.PRIMARY]: "text-primary",
  [Colors.PRIMARY_FOREGROUND]: "text-primary-foreground",
  [Colors.SECONDARY]: "text-secondary",
  [Colors.SECONDARY_FOREGROUND]: "text-secondary-foreground",
  [Colors.MUTED]: "text-muted",
  [Colors.MUTED_FOREGROUND]: "text-muted-foreground",
  [Colors.ACCENT]: "text-accent",
  [Colors.ACCENT_FOREGROUND]: "text-accent-foreground",
  [Colors.DESTRUCTIVE]: "text-destructive",
  [Colors.DESTRUCTIVE_FOREGROUND]: "text-destructive-foreground",
  [Colors.BORDER]: "border",
  [Colors.INPUT]: "text-input",
  [Colors.RING]: "ring",
} as const;
