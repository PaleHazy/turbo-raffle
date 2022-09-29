import { User } from "./users.interface";
import { Item } from "./items.interface";
import { Raffle } from "./raffles.interface";

export interface Ticket {
  id: number;
  raffle: Raffle
  raffleItem: Item;
  owner: User
  valueInDollars: number;
  isSold: boolean;
}
