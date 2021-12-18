 let fs = require("fs");

class Contenedor {
    constructor(url, id) {
        this.url = url;
        this.id = id;
    }
    async save(product) {
        try {
            let getProducts = await this.getAll();
            let getNewId = this.getNewId(getProducts);
            let new_product = {
                "id": getNewId,
                ...product                
            }
            getProducts.push(new_product);
            let content = JSON.stringify(getProducts, null, 2);
            fs.promises.writeFile(`${this.url}`, content);
            return getNewId;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            let getProducts = await this.getAll();
            if (getProducts[id - 1]) {
                return getProducts[id - 1]
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async getAll() {
        try {
            let getAllProducts = await fs.promises.readFile(`${this.url}`, 'utf-8');
            return JSON.parse(getAllProducts);
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById (id) {
        try {
            let getProducts = await this.getAll();
            let new_products = getProducts.filter(dato => dato.id !== id);
            await fs.promises.writeFile(`${this.url}`, JSON.stringify(new_products, null, 2));
            return null;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAll() {
        try {
            fs.promises.writeFile(`${this.url}`, '[]');
            return 0;
        } catch (error) {
            console.log(error);
        }
    }

    getNewId(getProducts) {
        let Idmax = getProducts.reduce((prev, current) => {
            if (current.id > prev.id) {
                return prev.id;
            } else {
                return current.id;
            }
        }, 0);
        return Idmax + 1;
    }
}

module.exports = Contenedor;