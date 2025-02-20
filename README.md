## Overview

This project is a **serverless API** built using **AWS Lambda, API Gateway, SQS, and DynamoDB** to manage WooCommerce product categories. It provides the following functionalities:

- **Import product categories asynchronously** from WooCommerce.
- **Retrieve all stored categories** from DynamoDB.
- **Delete a category by ID**.
- **Check the status of an ongoing import process**.

## Features

- **Asynchronous Processing** (Uses AWS SQS for background tasks)
- **Fully Serverless** (Managed by AWS Lambda & API Gateway)
- **Fast NoSQL Storage** (Uses AWS DynamoDB)
- **Secure & Scalable**
- **Easy Deployment with AWS SAM**

## Deployment Guide

### Prerequisites

- **Node.js 18+**
- **pnpm (preffered)**
- **AWS CLI** configured (`run aws configure after installation`)
- **AWS SAM CLI** installed ([Install Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html))

### Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repo/syncme-task.git
   cd syncme-task
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```
3. **Build and Deploy to the cloud**
   ```bash
   pnpm build:deploy
   ```
4. **Get the API Gateway URL from deployment logs**.

## API Endpoints

### 1️⃣ Import Categories (Async)

**Request:**

```bash
curl -X POST https://your-api-url/import
```

**Response:**

```json
{
  "success": true,
  "message": "Import process started"
}
```

### 4️⃣ Check Import Status

**Request:**

```bash
curl -X GET https://your-api-url/status
```

**Response:**

```json
{
  "success": true,
  "import_status": "pending" | "in-progress" | "completed"
}
```

### 2️⃣ Retrieve All Categories

**Request:**

```bash
curl -X GET https://your-api-url/categories
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "CategoryID": "15",
      "Name": "Clothing",
      "discription": "",
      "Parent": "23"
    }
  ]
}
```

### 3️⃣ Delete a Category

**Request:**

```bash
curl -X DELETE https://your-api-url/categories/15
```

**Response:**

```json
{
  "success": true,
  "message": "Category 15 deleted successfully"
}
```

## License

This project is licensed under the **MIT License**.

## Contributors

👨‍💻 **Amjad Yahia**\
📧 Email: [amjadyahia.dev@gmail.com](mailto:amjadyahia.dev@gmail.com)\
🔗 GitHub: [amjed-98](https://github.com/amjed-98)
