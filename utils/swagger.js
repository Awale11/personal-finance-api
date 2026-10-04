import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Personal Finance API",
            version: "1.0.0",
            description: "Personal Finance and Transaction Management API"
        },
        servers: [
            {
                // url: "http://localhost:5000"
                url: "https://personal-finance-api-1-zvi0.onrender.com"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        tags: [
            {
                name: "Auth",
                description: "Authentication endpoints"
            },
            {
                name: "Transactions",
                description: "Transaction management endpoints"
            },
            {
                name: "Upload",
                description: "File upload endpoints"
            },
            {
                name: "Admin",
                description: "Admin-only endpoints"
            }
        ]
    },
    apis: ["./routes/*.js"]
};

export const swaggerSpec = swaggerJSDoc(options);