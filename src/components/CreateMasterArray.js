import { GalleryImages as images } from './GalleryImages';

export const CreateMasterArray = () => {
    let array = [];

    for(let index in images) {

        for(let item in images[index].before) {
            array.push(images[index].before[item]);
        };

        for(let item in images[index].after) {
            array.push(images[index].after[item]);
        };
    };

    return array;
};