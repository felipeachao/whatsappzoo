const options = {
    openapi: '3.0.0',
    language: 'pt-BR',
}
const swaggerAutogen = require('swagger-autogen')(options);
const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./src/app.ts'];

const doc = {
    definitions: {
        Boolean: true,
        number: '559212345678',
        path: 'image.jpg'
    }
}
swaggerAutogen(outputFile, endpointsFiles, doc);