const express = require('express');
const path = require('path');
const MealPlanService = require('./meal-plan-service');
const { requireAuth } = require('../auth/jwt-auth');

const mealPlanRouter = express.Router();

mealPlanRouter
  .route('/')
  .all(requireAuth)
  .post((req, res, next) => {
    const db = req.app.get('db');

    const day_of_week = req.body.day_of_week;
    const newMealPlan = {
      user_id: req.user.id,
      day_of_week,
      //recipe_id: req.
    };

    for (const [key, value] of Object.entries(newMealPlan))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing ${key} in request body` },
        });

    MealPlanService.insertMeal(db, newMealPlan)
      .then(meal => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${meal.id}`))
          .json(MealPlanService.serializeMealPlan(meal));
      })
      .catch(next);
  })
  .get((req, res, next) => {
    const db = req.app.get('db');

    MealPlanService.getByUserId(db, req.user.id)
      .then(meals => {
        res.json(meals.map(MealPlanService.serializeMealPlan));
      })
      .catch(next);
  });

module.exports = mealPlanRouter;
