a. Query Processing
- POST /api/v1/queries
- Description: Process a user's natural language query related to biology.
- Payload: { query: string }
- Success Response: { success: true, data: { response: string | object, responseType: 'text' | 'table' | 'figure' }, message: 'Query processed successfully' }

b. File Upload
- POST /api/v1/uploads
- Description: Allows users to upload files for analysis or processing.
- Payload: FormData with the file.
- Success Response: { success: true, data: { fileId: string, message: 'File uploaded successfully' }, message: 'File processed successfully' }

c. Retrieve Local Environment Values
- GET /api/v1/environment
- Description: Get local environment values relevant to the user or the application's operation.
- Success Response: { success: true, data: { envValues: object }, message: 'Environment values retrieved successfully' }