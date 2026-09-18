import fs from 'fs';
import jwt from 'jsonwebtoken';

const token = jwt.sign({ email: 'test@example.com', purpose: 'quote_submission' }, process.env.JWT_SECRET || '8a2a227238d89626d84a0f42ae28f0ed7a6152ba28f8ed786b807a390d8e7e36', { expiresIn: '30m' });

const fileBuffer = fs.readFileSync('huge.stl');

const formData = new FormData();
formData.append('name', 'Test User');
formData.append('email', 'test@example.com');
formData.append('phone', '1234567890');
formData.append('material', 'PLA');
formData.append('verifiedToken', token);
formData.append('file', new Blob([fileBuffer]), 'large.stl');

fetch('http://localhost:3000/api/quote/submit', {
  method: 'POST',
  body: formData
})
.then(async (res) => {
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Response:', text);
})
.catch(err => console.error(err));
