import {
  Ban, Baby, Bike, Car, ChefHat, CigaretteOff, Clock, CookingPot, DoorOpen, Flame, KeyRound, Laptop,
  Moon, Mountain, PawPrint, Receipt, Snowflake, Umbrella, Users, WashingMachine, Wifi, type LucideIcon,
} from 'lucide-react'

const icons: Record<string, LucideIcon> = {
  ban: Ban, baby: Baby, bike: Bike, car: Car, chef: ChefHat, cigarette: CigaretteOff, clock: Clock,
  grill: CookingPot, door: DoorOpen, flame: Flame, key: KeyRound, laptop: Laptop, moon: Moon,
  mountain: Mountain, paw: PawPrint, receipt: Receipt, snowflake: Snowflake, umbrella: Umbrella,
  users: Users, washer: WashingMachine, wifi: Wifi,
}

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const Cmp = icons[name] ?? Mountain
  return <Cmp size={size} strokeWidth={1.6} aria-hidden />
}
