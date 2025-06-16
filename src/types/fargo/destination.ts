export interface Destination {
  id: string;
  route: string;
  routeEng: string;
  des: DestinationItem[];
}

export interface DestinationItem {
  id: string;
  name: string;
  nameEng: string;
}