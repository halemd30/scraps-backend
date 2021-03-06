BEGIN;

CREATE TYPE mealtype AS ENUM (
  'breakfast',
  'lunch',
  'dinner',
  'snack'
);

CREATE TYPE day AS ENUM (
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday', 
  'every day'
);

CREATE TABLE meal_plan (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  meal_type mealtype,
  day_of_week day NOT NULL
);

COMMIT;