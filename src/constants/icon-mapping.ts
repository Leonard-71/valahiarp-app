import {
  Beer,
  Binoculars,
  Briefcase,
  BriefcaseMedical,
  Building2,
  Castle,
  Cctv,
  Church,
  CreditCard,
  Croissant,
  Factory,
  Fish,
  Flame,
  GraduationCap,
  Hammer,
  Handshake,
  Home,
  Landmark,
  LucideIcon,
  PawPrint,
  Pickaxe,
  Scale,
  Scissors,
  ScrollText,
  Ship,
  Shirt,
  ShoppingBasket,
  Stethoscope,
  Store,
  Swords,
  Tent,
  TrainTrack,
  TreePine,
  Trees,
  Users,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

import { IconTag } from "@/generated/prisma";

export const iconTagToLucideMap: Record<IconTag, LucideIcon> = {
  // Casa -> house
  HOUSE: Home,
  // Ferma -> paw-print
  PAW_PRINT: PawPrint,
  // Conac/Mosie -> university
  UNIVERSITY: GraduationCap,
  // Afacere -> briefcase-business sau handshake
  BRIEFCASE_BUSINESS: Briefcase,
  HANDSHAKE: Handshake,
  // Bar -> beer SAU wine
  BEER: Beer,
  WINE: Wine,
  // Magazin -> store
  STORE: Store,
  // Magazin-mosie -> shopping-basket
  SHOPPING_BASKET: ShoppingBasket,
  // FORT -> castle
  CASTLE: Castle,
  // TRIB -> tent
  TENT: Tent,
  // Piata -> scale
  SCALE: Scale,
  // CAMP -> tent-tree SAU flame-kindling
  TENT_TREE: TreePine,
  FLAME_KINDLING: Flame,
  // Banda -> users
  USERS: Users,
  // Gara -> train-track
  TRAIN_TRACK: TrainTrack,
  // PORT -> ship
  SHIP: Ship,
  // CROITORIE -> scissors SAU coat-hanger
  SCISSORS: Scissors,
  COAT_HANGER: Shirt,
  // BRUTARIE -> croissant
  CROISSANT: Croissant,
  // FABRICA -> factory
  FACTORY: Factory,
  // PADURE -> trees SAU tree-pine
  TREES: Trees,
  TREE_PINE: TreePine,
  // PESCARIE -> fish
  FISH: Fish,
  // POLITIE -> binoculars
  BINOCULARS: Binoculars,
  // DOCTORI -> stethoscope SAU hospital sau briefcase-medical
  STETHOSCOPE: Stethoscope,
  HOSPITAL: Building2,
  BRIEFCASE_MEDICAL: BriefcaseMedical,
  // DOCUMENTE -> id-card-lanyard
  ID_CARD_LANYARD: CreditCard,
  // DOCUMENTE -> scroll-text
  SCROLL_TEXT: ScrollText,
  // BANCA -> landmark
  LANDMARK: Landmark,
  // RESTAURANT -> utensils-crossed
  UTENSILS_CROSSED: UtensilsCrossed,
  // PENITENCIAR/PUSCARIE -> cctv
  CCTV: Cctv,
  // BISERICA -> church
  CHURCH: Church,
  // CRAFT -> hammer
  HAMMER: Hammer,
  // MINA -> pickaxe
  PICKAXE: Pickaxe,
  // DUELURI -> swords
  SWORDS: Swords,
};

export const iconTagLabels: Record<IconTag, string> = {
  HOUSE: "Casă",
  PAW_PRINT: "Fermă",
  UNIVERSITY: "Conac/Moșie",
  BRIEFCASE_BUSINESS: "Afacere",
  HANDSHAKE: "Parteneriat",
  BEER: "Bar (Bere)",
  WINE: "Bar (Vin)",
  STORE: "Magazin",
  SHOPPING_BASKET: "Magazin-Moșie",
  CASTLE: "Fort",
  TENT: "Trib",
  SCALE: "Piață",
  TENT_TREE: "Tabără (Pădure)",
  FLAME_KINDLING: "Tabără (Foc)",
  USERS: "Bandă",
  TRAIN_TRACK: "Gară",
  SHIP: "Port",
  SCISSORS: "Croitorie",
  COAT_HANGER: "Atelierul de croitorie",
  CROISSANT: "Brutărie",
  FACTORY: "Fabrică",
  TREES: "Pădure",
  TREE_PINE: "Pădure de conifere",
  FISH: "Pescărie",
  BINOCULARS: "Poliție",
  STETHOSCOPE: "Doctori",
  HOSPITAL: "Spital",
  BRIEFCASE_MEDICAL: "Cabinet medical",
  ID_CARD_LANYARD: "Documente (ID)",
  SCROLL_TEXT: "Documente (Acte)",
  LANDMARK: "Bancă",
  UTENSILS_CROSSED: "Restaurant",
  CCTV: "Penitenciar",
  CHURCH: "Biserică",
  HAMMER: "Meșteșuguri",
  PICKAXE: "Mină",
  SWORDS: "Dueluri",
};

export const getIconComponent = (iconTag: IconTag): LucideIcon => {
  return iconTagToLucideMap[iconTag];
};
