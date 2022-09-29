import { Item } from "./items.interface";
import { Ticket } from "./tickets.interface";

export interface Raffle {
  id: number;
  name: string;
  description: string;
  raffleItem: Item;
  tickets: Ticket[];
}
