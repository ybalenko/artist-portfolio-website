export type ExhibitionStatus = "current" | "past" | "upcoming";

export interface ExhibitionEntry {
  title: string;
  venue: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  url?: string;
}

export interface ExhibitionSection {
  status: ExhibitionStatus;
  label: string;
  title: string;
  description: string;
  emptyMessage: string;
}

export const exhibitionSections: ExhibitionSection[] = [
  {
    status: "current",
    label: "Current",
    title: "Current exhibitions",
    description: "Current exhibitions featuring work by Yulia Balenko.",
    emptyMessage: "No current exhibitions are listed yet.",
  },
  {
    status: "past",
    label: "Past",
    title: "Past exhibitions",
    description: "Past exhibitions featuring work by Yulia Balenko.",
    emptyMessage: "Past exhibitions will be added soon.",
  },
  {
    status: "upcoming",
    label: "Upcoming",
    title: "Upcoming exhibitions",
    description: "Upcoming exhibitions featuring work by Yulia Balenko.",
    emptyMessage: "No upcoming exhibitions are listed yet.",
  },
];

export const exhibitionsByStatus: Record<ExhibitionStatus, ExhibitionEntry[]> =
  {
    current: [],
    past: [],
    upcoming: [],
  };
