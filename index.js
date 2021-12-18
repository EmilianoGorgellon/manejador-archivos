let Contenedor = require("./contenedor");
let contenedor = new Contenedor("productos.txt");
let object = {
    "foto": "https://static-geektopia.com/storage/t/i/461/46150/1547fcbd1e4d383a350d9362e.webp",
    "precio": 10000
}
const main = async () => {
    let test = await contenedor.save(object)
    // let test = await contenedor.getAll();
    // let test = await contenedor.getById(3);
    // let test = await contenedor.deleteById(2);
    // let test = await contenedor.deleteAll();
    console.log(test)
}

main();