import swaggerJSDoc from "swagger-jsdoc";
import dotenv from 'dotenv';
dotenv.config();

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
                url: process.env.NODE_ENV == "development" ? "http://localhost:5000" : "https://personal-finance-api-wm9t.onrender.com"
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