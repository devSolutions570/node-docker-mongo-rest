import { store } from '@risingstack/react-easy-state'
import { Nutrition } from '../types/types'

let initNutritions: Nutrition[] = [];

const nutritions = store({
    all: initNutritions,
    // create: (nutrition: Nutrition) => {
    //     let nutritionObject: Nutrition = nutritions.all[nutritions.all.length-1];
    //     if (nutritions.all.length === 0) {
    //         nutrition.id = 0;    
    //     } else {
    //         nutrition.id = nutritionObject.id + 1;
    //     }
    //     nutritions.all.push(nutrition);
    // },
    get: (id: string) => {
        let index = nutritions.all.findIndex((obj: Nutrition) => obj._id === id);
        return nutritions.all[index];
    },
    update: (id: string, nutrition: Nutrition) => {
        nutritions.all[id] = nutrition;
    },
    delete: (id: string) => {
        let index = nutritions.all.findIndex((obj: Nutrition) => obj._id === id);
        nutritions.all.splice(index, 1);
    },
    reset: () => {
        nutritions.all = [];
    },
    setDatas: (datas: Nutrition[]) => {
        nutritions.all = datas;
    }
});

export default nutritions;