BEGIN;

TRUNCATE
  users,
  recipes,
  meal_plan
  RESTART IDENTITY CASCADE;

INSERT INTO users (username, email, password)
  VALUES
    ('testuser1', 'test@email.com', 'Password87'),
    ('userman2', 'testytest@email.com', 'Pwordpass78'),
    ('testyman3', 'testicles@balls.com', 'Goodnsecret007');

INSERT INTO recipes (user_id, name, category, type)
  VALUES  
    (1, 'Stromboli', 'italian', 'dinner'),
    (2, 'Lasagna', '', 'snack'),
    (3, 'Chicken pesto', 'meat', 'dinner'),
    (3, 'turkey sandwich', '', 'lunch');

INSERT INTO meal_plan (recipe_id, user_id, meal_type, day_of_week)
  VALUES
    (3, 3, 'breakfast', 'monday'),
    (1, 1, 'lunch', 'tuesday'),
    (4, 3, 'dinner', 'wednesday'),
    (4, 3, 'snack', 'thursday'),
    (1, 1, 'lunch', 'saturday'),
    (2, 2, 'snack', 'saturday');

COMMIT;