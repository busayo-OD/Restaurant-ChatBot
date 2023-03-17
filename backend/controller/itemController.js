const fs = require('fs')
const path = require('path')
const itemsDbPath = path.join(__dirname, "../DB", 'items.json');

exports.getItems =  (req, res) => {
    fs.readFile(itemsDbPath, "utf8", (err, items) => {
        if (err) {
            console.log(err)
            res.send("An error occured")
        } else {
            res.send(JSON.parse(items))
        }
    })
}

exports.getItemById = (req, res) => {
    fs.readFile(itemsDbPath, "utf8", (err, items) => {
        if (err) {
            console.log(err)
            res.send("An error occured") 
        } else {
            const itemsObj = JSON.parse(items)
            const item = itemsObj.find(itm => itm.id === req.params.id);
            res.send(item)
        }
    })
}
