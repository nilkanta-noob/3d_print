import fs from 'fs';

const formData = new FormData();
formData.append('name', 'Test User');
formData.append('email', 'test@example.com');
formData.append('phone', '1234567890');
formData.append('material', 'PLA');
formData.append('file', new Blob(['test']), 'test.stl');

fetch('http://localhost:3000/api/quote', {
  method: 'POST',
  body: formData
})
.then(async (res) => {
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
})
.catch(err => console.error(err));
