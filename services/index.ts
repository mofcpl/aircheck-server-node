import { Model, UpdateWriteOpResult } from 'mongoose'

import { TimeUnit } from '../utils/enums'

export const getDataFromBuffer = (newModel: Model<any>, id: number, endpoint: string, expirationTime: number, expirationUnit: TimeUnit, dontAddIdToEndpoint: boolean = false): Promise<string> => {
    return newModel.findOne({ dataId: id })
        .then((model) => {
            if (!model || isOutdated(model.updateTime, expirationTime, expirationUnit)) {
                return getDataFromOrigin(endpoint, dontAddIdToEndpoint ? null : id)
                    .then(dataFromOrigin => saveData(model, newModel, dataFromOrigin, id)
                    .then(() => dataFromOrigin));
            } else {
                return Promise.resolve(model.data);
            }
        });
};

const getDataFromOrigin = (uri: string, id: number | null): Promise<string> => {
    let endpoint = uri;
    if (id) endpoint += id.toString();
    return fetch(endpoint, { method: "GET"})
        .then(response => {
            if (response.ok) return response.json()
            else return Promise.reject("Origin returned no data")
        })
}

const saveData = (model: Model<any> | null, newModel: Model<any>, data: string, id: number): Promise<UpdateWriteOpResult> => {
    if (model) {
        return model.updateOne({ data: JSON.stringify(data), updateTime: new Date() }).exec();
    } else {
        const document = new newModel();
        document.updateTime = new Date();
        document.dataId = id;
        document.data = JSON.stringify(data);
        return document.save().then(() => {});
    }
};

const isOutdated = (modelUpdateDate: Date, expirationTime: number, expirationUnit: TimeUnit) => {
    const expirationDate = new Date(modelUpdateDate);
    switch (expirationUnit) {
        case TimeUnit.minutes: expirationDate.setMinutes(expirationDate.getMinutes() + expirationTime); break;
        case TimeUnit.days: expirationDate.setDate(expirationDate.getDate() + expirationTime); break;
        case TimeUnit.hours: expirationDate.setHours(expirationDate.getHours() + expirationTime); break;
        case TimeUnit.months: expirationDate.setMonth(expirationDate.getMonth() + expirationTime); break;
    }
    const currentDate = new Date();
    return currentDate > expirationDate
}