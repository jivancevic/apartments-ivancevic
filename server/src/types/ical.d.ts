declare module "ical" {
  export interface ICalEvent {
    type: string;
    summary?: string;
    start?: Date;
    end?: Date;
    description?: string;
    location?: string;
    [key: string]: unknown;
  }

  export interface ICalData {
    [key: string]: ICalEvent;
  }

  export function parseICS(icsData: string): ICalData;
}
