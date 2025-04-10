type Challenge = {
  id: string;
  challenger_user_id: string;
  challenged_user_id: string;
  winner_user_id: string | null;
  is_finished: boolean;
  game_id: string;

  challenger_user: {
    id: string;
    email: string;
    username: string;
    house: string;
    password: string;
    points: number;
  };

  challenged_user: {
    id: string;
    email: string;
    username: string;
    house: string;
    password: string;
    points: number;
  };

  game: {
    id: string;
    userId: string;
    attempts: number;
    game_1_character_id: string;
    game_2_character_id: string;
    game_3_spell_id: string;
  };
};
