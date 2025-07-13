# Printer API Documentation

This document describes the Printer API endpoints that support PDF, material tracing, and product printing functionalities.

## Configuration

Add the printer configuration to your `config.yaml` file:

```yaml
printer:
  type: "http"  # Type of printer service
  url: "http://localhost:8080/print"  # URL endpoint for the printer service
```

## API Endpoints

All endpoints require authentication and are available under `/v1/printer/`.

### 1. Print PDF Document

**Endpoint:** `POST /v1/printer/pdf`

**Description:** Creates a PDF print job.

**Request Body:**
```json
{
  "content": "PDF document content or HTML",
  "options": {
    "copies": 1,
    "priority": "normal"
  },
  "pdfOptions": {
    "format": "A4",
    "orientation": "portrait",
    "margin": "10mm"
  }
}
```

**Response:**
```json
{
  "jobId": "pdf-job-abc123",
  "status": "queued",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### 2. Print Material Tracing Document

**Endpoint:** `POST /v1/printer/materialTracing`

**Description:** Creates a material tracing print job.

**Request Body:**
```json
{
  "content": "Material tracing document content",
  "options": {
    "copies": 1,
    "priority": "high"
  },
  "tracingData": {
    "batchNumber": "BATCH001",
    "materialId": "MAT123",
    "supplier": "Supplier XYZ",
    "date": "2024-01-01"
  }
}
```

**Response:**
```json
{
  "jobId": "tracing-job-def456",
  "status": "queued",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### 3. Print Product Document

**Endpoint:** `POST /v1/printer/product`

**Description:** Creates a product print job.

**Request Body:**
```json
{
  "content": "Product information content",
  "options": {
    "copies": 2,
    "priority": "normal"
  },
  "productData": {
    "productId": "PROD001",
    "name": "Product Name",
    "quantity": 100,
    "category": "Electronics"
  }
}
```

**Response:**
```json
{
  "jobId": "product-job-ghi789",
  "status": "queued",
  "createdAt": "2024-01-01T12:00:00Z"
}
```

### 4. Get Print Job Status

**Endpoint:** `GET /v1/printer/jobs/{jobId}/status`

**Description:** Retrieves the status of a print job.

**Path Parameters:**
- `jobId` (string): The ID of the print job

**Response:**
```json
{
  "jobId": "pdf-job-abc123",
  "status": "completed"
}
```

**Possible status values:**
- `queued` - Job is waiting to be processed
- `processing` - Job is currently being processed
- `completed` - Job completed successfully
- `failed` - Job failed to complete

## Error Responses

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Printer configuration not found",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

## Example Usage

### Using curl

```bash
# Print a PDF document
curl -X POST http://localhost:3000/v1/printer/pdf \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "content": "<html><body><h1>Test PDF</h1></body></html>",
    "pdfOptions": {
      "format": "A4"
    }
  }'

# Check job status
curl -X GET http://localhost:3000/v1/printer/jobs/pdf-job-abc123/status \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Using JavaScript/TypeScript

```typescript
import axios from 'axios';

const printerApi = axios.create({
  baseURL: 'http://localhost:3000/v1/printer',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  }
});

// Print PDF
const pdfResponse = await printerApi.post('/pdf', {
  content: '<html><body><h1>Test PDF</h1></body></html>',
  pdfOptions: {
    format: 'A4',
    orientation: 'portrait'
  }
});

console.log('PDF Job ID:', pdfResponse.data.jobId);

// Check status
const statusResponse = await printerApi.get(`/jobs/${pdfResponse.data.jobId}/status`);
console.log('Job Status:', statusResponse.data.status);
```

## Integration Notes

- The printer service forwards requests to the configured printer URL endpoint
- All print jobs are assigned unique IDs using nanoid
- The actual printing implementation depends on the configured printer service
- Error handling includes validation of required configuration parameters
- All endpoints support OpenAPI/Swagger documentation when running the server