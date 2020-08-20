'use strict';

const NutritionModel = require('../models/nutrition');
import { Nutrition } from '../types/type'

class NutritionRepository {
    getById(id: string) {
        return NutritionModel.find({_id: id});
    }
    getAll() {
        return NutritionModel.find({})
            .then((items: Nutrition[]) => {
                return items;
            })
            .catch(() => {
                return { error: "no Item found"}
            })
    }
    delete(id: string) {
        return NutritionModel.deleteOne({ _id: id }).then(() => {
            return NutritionModel.find()
                .then(() => {
                    return { success: "delete success!"};
                })
                .catch(() => {
                    return { error: "no Item found"}
                })
        })
        .catch(() => {
            return { error: "delete failed"}
        });
    }
    reset(id: string) {
        return NutritionModel.deleteMany().then(() => {
            return { success: "reset successed!"};
        })
        .catch(() => {
            return { error: "delete failed"}
        });
    }
    update(nutrition: Nutrition) {
        return NutritionModel.findOneAndUpdate({_id: NutritionModel._id}, nutrition).then(() => {
            return NutritionModel.find()
                .then((items: Nutrition[]) => {
                    return items;
                })
                .catch(() => {
                    return { error: "no Item found"}
                })
        })
    }
    create(nutrition: Nutrition) {
        const newItem = new Nutrition({
            dessertName: nutrition.dessertName,
            calories: nutrition.calories,
            fat: nutrition.fat,
            carbs: nutrition.carbs,
            protein: nutrition.protein
        });

        return newItem.save()
        .then(() => {
            return NutritionModel.find()
                .then((items: Nutrition[]) => {
                    return items;
                })
                .catch(() => {
                    return { error: "no Item found"}
                })
        })
        .catch(() => {
            return { error: "can not add item"}
        });
    }
}

const nutritionRepository = new NutritionRepository();

module.exports = nutritionRepository;