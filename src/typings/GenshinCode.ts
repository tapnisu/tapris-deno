export interface GIPNResponse {
  CODES: Code[];
}

export interface Code {
  reward: string;
  date: string;
  code: string;
  is_expired: boolean;
  region: number;
  reward_array: RewardArray[];
}

export interface RewardArray {
  image_path: string;
  name: string;
  count: string;
  rarity: Rarity;
}

export enum Rarity {
  RarityFiveStar = "rarity_five_star",
  RarityFourStar = "rarity_four_star",
  RarityTreeStar = "rarity_tree_star",
  RarityTwoStar = "rarity_two_star",
  RarityOneStar = "rarity_one_star",
}
