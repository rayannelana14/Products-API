const express = require('express');
const apiV1Router = express.Router();

// Use express.json() para processar o corpo da requisição
apiV1Router.use(express.json());

const list_products = {
    products: [
        { id: 1, descricao: "Arroz parboilizado 5Kg", valor: 25.00, marca: "Tio João"  },
        { id: 2, descricao: "Maionese 250gr", valor: 7.20, marca: "Helmans"  },
        { id: 3, descricao: "Iogurte Natural 200ml", valor: 2.50, marca: "Itambé"  },
        { id: 4, descricao: "Batata Maior Palha 300gr", valor: 15.20, marca: "Chipps"  },
        { id: 5, descricao: "Nescau 400gr", valor: 8.00, marca: "Nestlé"  },
    ]
}

// API Routes
apiV1Router.get('/products', (req, res) => {
    res.status(200).json(list_products.products);
});

apiV1Router.get('/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const product = list_products.products.find(p => p.id === id);

    if (!product) {
        res.status(404).json({ message: 'product not found' });
    } else {
        res.status(200).json(product);
    }
});

apiV1Router.post('/products', (req, res) => {
    const { descricao, valor, marca } = req.body;


    const newProduct = {
        id: list_products.products.length + 1,
        descricao,
        valor,
        marca
    };

    list_products.products.push(newProduct);

    res.status(200).json(newProduct);
});

apiV1Router.put('/products/:id', (req, res) => {
    const productIndex = list_products.products.findIndex(p => p.id == parseInt(req.params.id));

    if(productIndex === -1) {
        res.status(404).json({ message: 'Product not found'});
    } else {
        const { descricao, valor, marca } = req.body;

        list_products.products[productIndex] = {id: productIndex, descricao, valor, marca};

        res.json(list_products.products[productIndex]);
    }
});


apiV1Router.delete('/products/:id', (req, res) => {
    const productIndex = list_products.products.findIndex(p => p.id == parseInt(req.params.id));

    if(productIndex === -1) {
        res.status(404).json({ message: 'Product not found'});
    } else {
    
        list_products.products.splice(productIndex, 1);

        res.json({message: 'Sucessfully deleted product'});
    }
})

module.exports = apiV1Router;
