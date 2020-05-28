import { Product } from '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts';

let products: Product[] = [
    {
        id: "1",
        name: 'Product one',
        description: "This is product one",
        price: 100
    },
    {
        id: "2",
        name: 'Product two',
        description: "This is product two",
        price: 200
    },
    {
        id: "3",
        name: 'Product three',
        description: "This is product three",
        price: 300
    },
];



// @desc GET All products
// @route GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
    response.body = {
        success: true,
        data: products
    }
}

// @desc Get product by id
// @route GET /api/v1/products/:id
const getProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        response.status = 200;
        response.body = {
            success: true,
            data: product
        }
    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }

}


// @desc Add product
// @route POST /api/v1/products
const addProduct = async ({ request, response }: { request: any, response: any }) => {
    const body = await request.body();

    if (!request.hasBody) {
        console.log('no data found');
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        console.log('adding data..')
        const product: Product = body.value;
        console.log('product name - ' + product.name);
        product.id = v4.generate();
        console.log(`id generated - ${product.id}`)

        products.push(product);

        response.status = 201;
        response.body = {
            success: true,
            data: product
        }
    }
}


// @desc Update product
// @route PUT /api/v1/products/:id
const updateProduct = async ({ params, request, response }: { params: { id: string }, request: any, response: any }) => {
    const product: Product | undefined = products.find(p => p.id === params.id);

    if (product) {
        const body = await request.body();

        if (request.hasBody) {
            const updateData: { name?: string; description?: string, price?: number } = body.value;

            products = products.map(p => p.id === params.id ? { ...p, ...updateData } : p)

            response.status = 200;
            response.body = {
                success: true,
                data: updateData
            }
        } else {
            response.status = 400;
            response.body = {
                success: false,
                msg: 'No data to update'
            }
        }

    } else {
        response.status = 404;
        response.body = {
            success: false,
            msg: 'Product not found'
        }
    }
}

// @desc Delete product
// @route DELETE /api/v1/products/:id
const deleteProduct = ({ params, response }: { params: { id: string }, response: any }) => {
    products = products.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'Product removed'
    }
}

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct }