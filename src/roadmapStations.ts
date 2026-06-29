import { getActiveJourney, journeyDefinitions } from "./journey";
import type { JourneyStation, StationNumber } from "./journey";

export type { StationNumber };
export type Station = JourneyStation;

export const roadmapStations: Station[] = journeyDefinitions.future.stations;

export const getRoadmapStations = () => getActiveJourney().stations;
