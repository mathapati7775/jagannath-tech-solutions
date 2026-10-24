# AWS Lambda & API Gateway Production Deployment Guide
**Jagannath Tech Solutions — Serverless Email & API Engine**

This directory contains the production-ready serverless backend designed to run on **AWS Lambda** in `ap-south-1` (Mumbai) and integrate with **Amazon SES** and **AWS Amplify**.

---

## Architecture Overview

```
User Browser (techjagannath.com)
       │
       ▼  POST /api/consultation or /api/contact
AWS Amplify (CloudFront Rewrite: /api/* -> API Gateway)
       │
       ▼
Amazon API Gateway (HTTP API)
       │
       ▼
AWS Lambda Function (Node.js 20.x, ap-south-1)
       │  (Uses IAM Execution Role: ses:SendEmail)
       ▼
Amazon SES (Delivers to info@techjagannath.com)
```

---

## Step-by-Step Deployment Instructions

### Step 1: Create IAM Execution Role for Lambda
1. In the AWS Console, open **IAM** ➔ **Roles** ➔ **Create role**.
2. Select **AWS service** and use case **Lambda**.
3. Create an inline policy or customer-managed policy using the JSON from [`iam-policy.json`](./iam-policy.json). Do not attach `AWSLambdaBasicExecutionRole` if you do not want Lambda execution logs written to CloudWatch.
4. Name the role: `techjagannath-api-lambda-role`.

### Step 2: Create AWS Lambda Function
1. In the AWS Console, open **AWS Lambda** in region **`ap-south-1` (Mumbai)**.
2. Click **Create function** ➔ **Author from scratch**:
   * **Function name:** `techjagannath-api-handler`
   * **Runtime:** `Node.js 20.x`
   * **Architecture:** `x86_64` (or `arm64`)
   * **Execution role:** Use existing role `techjagannath-api-lambda-role`.
3. In the Code editor, paste the contents of [`api-handler.js`](./api-handler.js) into `index.js` (or upload as zip) and click **Deploy**.
   * Verify **Runtime settings**: Handler is set to `api-handler.handler` (or `index.handler`).
4. In **Configuration** ➔ **Environment variables**, set:
   * `CONTACT_RECEIVER_EMAIL` = `info@techjagannath.com`
   * `SES_FROM_EMAIL` = `info@techjagannath.com`

### Step 3: Create Amazon API Gateway (HTTP API)
1. Open **Amazon API Gateway** Console in **`ap-south-1`**.
2. Click **Create API** ➔ **HTTP API** ➔ **Build**.
3. Under Integrations, choose **Lambda** and select `techjagannath-api-handler`.
4. Name the API: `techjagannath-api`.
5. Configure routes:
   * Method: `ANY`, Resource path: `/{proxy+}` (or `$default`).
6. Complete creation and copy your **API Invoke URL** (e.g., `https://abc123xyz.execute-api.ap-south-1.amazonaws.com`).

### Step 4: Configure AWS Amplify Reverse Proxy (No Frontend Changes Needed)
1. In the **AWS Amplify Console**, select your app `techjagannath.com`.
2. Go to **Hosting** ➔ **Rewrites and redirects** ➔ **Add rule**:
   * **Source address**: `/api/<*>`
   * **Target address**: `https://<your-api-id>.execute-api.ap-south-1.amazonaws.com/api/<*>`
   * **Type**: `200 (Rewrite)`
3. Save changes.

Now, all requests from `techjagannath.com/api/*` seamlessly route through your Lambda to Amazon SES without CORS issues or frontend URL alterations. The Lambda role needs only the SES permissions in `iam-policy.json`; without CloudWatch Logs permissions, Lambda execution logs will not be retained there.
