interface IBaseCombo {
  name: string;
  desc: string;
}

export interface ISpeed {
  walk: number;
  burrow: number;
  fly: number;
  hover: boolean;
  swim: number;
  climb: number;
}

export interface ISkills {
  perception: number;
  stealth: number;
}

export interface IAction extends IBaseCombo {
  attack_bonus?: number;
  damage_dice: string;
  damage_bonus?: number;
}

export interface ILegendaryAction extends IBaseCombo {}

export interface ISpecialAbility extends IBaseCombo {}

export interface IReaction extends IBaseCombo {}

export interface IMonster {
  slug: string;
  name: string;
  size: string;
  type: string;
  subtype: string;
  group: string;
  alignment: string;
  armor_class: number;
  armor_desc: string;
  hit_points: number;
  hit_dice: string;
  speed: ISpeed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  strength_save?: any;
  dexterity_save: number;
  constitution_save: number;
  intelligence_save?: any;
  wisdom_save: number;
  charisma_save: number;
  perception: number;
  skills: ISkills;
  damage_vulnerabilities: string;
  damage_resistances: string;
  damage_immunities: string;
  condition_immunities: string;
  senses: string;
  languages: string;
  challenge_rating: string;
  actions: IAction[];
  reactions: IBaseCombo[];
  legendary_desc: string;
  legendary_actions: ILegendaryAction[];
  special_abilities: ISpecialAbility[];
  spell_list: any[];
  img_main?: any;
  document__slug: string;
  document__title: string;
  document__license_url: string;
}

export type FormattedMonster =
  | {
      speed: string;
      skills: string;
      saving_throws: string;
    }
  | IMonster;

export type MonsterPreview = Pick<
  IMonster,
  | "slug"
  | "name"
  | "size"
  | "type"
  | "hit_points"
  | "alignment"
  | "challenge_rating"
  | "armor_class"
  | "armor_desc"
  | "hit_dice"
>;

export type Stat = Pick<
  IMonster,
  | "strength"
  | "dexterity"
  | "constitution"
  | "intelligence"
  | "wisdom"
  | "charisma"
>;

export interface IGetAllMonstersFilters {
  name?: string;
  challenge_rating?: string;
  type?: string;
}
