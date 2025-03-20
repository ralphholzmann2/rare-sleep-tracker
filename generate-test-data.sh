# Replace with your token returned from the login endpoint
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0MjUwNjgzMSwiZXhwIjoxNzQyNTkzMjMxfQ.4qDdFoSHRe9x45FSg1dtRq5S7NGgRtHaL1-vq3cKqfA"

# March 1, 2025 (Saturday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-01T23:00:00.000-06:00",
  "endTime": "2025-03-02T07:30:00.000-06:00"
}'

# March 2, 2025 (Sunday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-02T23:30:00.000-06:00",
  "endTime": "2025-03-03T08:00:00.000-06:00"
}'

# March 3, 2025 (Monday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-03T22:15:00.000-06:00",
  "endTime": "2025-03-04T06:30:00.000-06:00"
}'

# March 4, 2025 (Tuesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-04T22:30:00.000-06:00",
  "endTime": "2025-03-05T06:45:00.000-06:00"
}'

# March 5, 2025 (Wednesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-05T22:30:00.000-06:00",
  "endTime": "2025-03-06T07:00:00.000-06:00"
}'

# March 6, 2025 (Thursday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-06T22:45:00.000-06:00",
  "endTime": "2025-03-07T07:00:00.000-06:00"
}'

# March 7, 2025 (Friday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-07T23:15:00.000-06:00",
  "endTime": "2025-03-08T08:30:00.000-06:00"
}'

# March 8, 2025 (Saturday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-08T23:45:00.000-06:00",
  "endTime": "2025-03-09T08:45:00.000-06:00"
}'

# March 9, 2025 (Sunday - Daylight Saving Time starts)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-09T23:00:00.000-05:00",
  "endTime": "2025-03-10T07:30:00.000-05:00"
}'

# March 10, 2025 (Monday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-10T22:00:00.000-05:00",
  "endTime": "2025-03-11T06:15:00.000-05:00"
}'

# March 11, 2025 (Tuesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-11T22:30:00.000-05:00",
  "endTime": "2025-03-12T06:45:00.000-05:00"
}'

# March 12, 2025 (Wednesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-12T21:45:00.000-05:00",
  "endTime": "2025-03-13T06:30:00.000-05:00"
}'

# March 13, 2025 (Thursday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-13T22:30:00.000-05:00",
  "endTime": "2025-03-14T07:15:00.000-05:00"
}'

# March 14, 2025 (Friday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-14T00:15:00.000-05:00",
  "endTime": "2025-03-14T08:45:00.000-05:00"
}'

# March 15, 2025 (Saturday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-15T23:30:00.000-05:00",
  "endTime": "2025-03-16T09:00:00.000-05:00"
}'

# March 16, 2025 (Sunday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-16T23:15:00.000-05:00",
  "endTime": "2025-03-17T08:00:00.000-05:00"
}'

# March 17, 2025 (Monday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-17T21:45:00.000-05:00",
  "endTime": "2025-03-18T06:30:00.000-05:00"
}'

# March 18, 2025 (Tuesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-18T22:15:00.000-05:00",
  "endTime": "2025-03-19T06:30:00.000-05:00"
}'

# March 19, 2025 (Wednesday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-19T22:30:00.000-05:00",
  "endTime": "2025-03-20T07:00:00.000-05:00"
}'

# March 20, 2025 (Thursday)
curl -X 'POST' \
  'http://localhost:3000/entries' \
  -H 'accept: */*' \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
  "startTime": "2025-03-20T23:00:00.000-05:00",
  "endTime": "2025-03-21T07:30:00.000-05:00"
}'