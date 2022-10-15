'use strict';

class DataCollection {

    constructor(model) {
        this.model = model;
    }
    get(id) {
        return this.model.findOne({
            where: {
                id: id
            }
        });
    }
    getCategory(name) {
        return this.model.findOne({
            where: {
                name: name
            }
        });
    }

    getAll(id) {
        return this.model.findAll({
            where: {
                user_id: id
            }
        });
    }

    searchByUser(id) {
        return this.model.findAll({
            where: {
                user_id: id
            }
        });
    }

    searchByName(name) {
        return this.model.findAll({
            where: {
                title: name
            }
        });
    }

    searchByCategory(category_id) {
        return this.model.findAll({
            where: {
                category_id
            }
        });
    }

    searchByPrice(price) {
        return this.model.findAll({
            where: {
                price
            }
        });
    }

    searchByColor(color) {
        return this.model.findAll({
            where: {
                color
            }
        });
    }

    searchByCategoryPrice(category_id, price) {
        return this.model.findAll({
            where: {
                category_id,
                price
            }
        });
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data, id2) {
        // edit if the item not exist at all return no product
        return this.model.findOne({
                where: {
                    user_id: id2,
                    id: id
                }
            })
            .then(record => {
                console.log(record)
                if (record) {
                    record.update(data);
                    return record;
                } else {
                    return 'Access denied';
                }
            });
    }

    deleteAll(id) {
        return this.model.destroy({
            truncate: {
                cascade: true
            },
            where: {
                user_id: id
            }
        });
    }

    delete(id, id2) {
        if (id2) { //extra
            return this.model.destroy({
                where: {
                    id: id,
                    user_id: id2
                }
            });
        }
    }
}

module.exports = DataCollection;