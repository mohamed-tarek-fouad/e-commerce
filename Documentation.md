# Library System

## Instructions
first make sure you install Docker 
open the terminal and run
```
docker-compose up -d
```
## API Reference

#### root uri
```http
 http://localhost:3000/
deployed: 20.21.200.84:3000
```
#### Register Admin
```http
  POST /auth/register
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`       | `string` | **Required** **Unique** must be valid email m@gmail.com|
| `name`   | `string`  | **Required** |
| `password`       | `string` | **Required** must have lowecase,uppercase,nums,special chracters and more than 8 |

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `email`       | `string` | 
| `name`   | `string`  | 
| `message`       | `string` | 
| `access_token`       | `string` | 
| `id`     | `string` | 

#### Login Admin

```http
  POST /auth/login
```

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`       | `string` | **Required** **Unique** must be valid email m@gmail.com|
| `password`       | `string` | **Required** must have lowecase,uppercase,nums,special chracters and more than 8 |

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `email`       | `string` | 
| `name`   | `string`  | 
| `message`       | `string` | 
| `access_token`       | `string` | 
| `id`     | `string` | 

#### Add Product

```http
  POST /product/addProduct
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}|

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`       | `string` | **Required** |
| `description`       | `string` | **Required** |
| `price`       | `string` | **Required** |
| `quantity`       | `string` | **Required** |
| `category`       | `string` | **Required** |
| `image`       | `file` | **optional** |

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
| `product`   | `objects`  | 
| `product.id`       | `string` | 
| `product.name`       | `string` | 
| `product.price`     | `float` | 
| `product.category`       | `int` | 
| `product.image`       | `string` | 

#### Update Product

```http
  PATCH /product/updateProduct/${productId}
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}|

| Param Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`       | `string` | **Required**|

| Body Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`       | `string` | **Optional** |
| `description`       | `string` | **Optional** |
| `price`       | `string` | **Optional** |
| `quantity`       | `string` | **Optional** |
| `category`       | `string` | **Optional** |

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
| `product`   | `objects`  | 
| `product.id`       | `string` | 
| `product.name`       | `string` | 
| `product.price`     | `float` | 
| `product.category`       | `int` | 
| `product.image`       | `string` | 


#### delete Product

```http
  DELETE /product/deleteProduct/${productId}
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}                   MUST BE ADMIN           |

| Param Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`       | `string` | **Required**|

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 

#### Get Product

```http
  GET /product/getProduct/${productId}
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}|

| Param Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `productId`       | `string` | **Required**|

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
| `product`   | `objects`  | 
| `product.id`       | `string` | 
| `product.name`       | `string` | 
| `product.price`     | `float` | 
| `product.category`       | `int` | 
| `product.image`       | `string` | 

#### All Products

```http
  GET /product/allProducts
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}|

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page`       | `string` | **Optional Default: 1 **|
| `size`       | `string` | **Optional Default: 10 **|

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
| `products[]`   | `array`  | 
| `product[].id`       | `string` | 
| `product[].name`       | `string` | 
| `product[].price`     | `float` | 
| `product[].category`       | `int` | 
| `product[].image`       | `string` | 

#### Search Product

```http
  GET /product/searchProduct
```
| Header Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authentication`       | `string` | **Required** Bearer ${accessToken}|

| Query Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name`       | `string` | **Optional**|
| `description`       | `string` | **Optional**|
| `category`       | `string` | **Optional**|

### Response 
| Body Parameter | Type     | 
| :-------- | :------- | 
| `message`       | `string` | 
| `products[]`   | `array`  | 
| `product[].id`       | `string` | 
| `product[].name`       | `string` | 
| `product[].price`     | `float` | 
| `product[].category`       | `int` | 
| `product[].image`       | `string` | 
