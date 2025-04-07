export type Game = {
  id: string;
  game_1_character_id: string;
  game_2_character_id: string;
  game_3_spell_id: string;
  attempts: number;
  userId: string | null;
};
