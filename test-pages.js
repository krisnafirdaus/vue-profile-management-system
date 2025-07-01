// Simple test script to verify all pages are accessible
const pages = [
  'http://localhost:3000',
  'http://localhost:3000/login',
  'http://localhost:3000/register',
  'http://localhost:3000/profile',
  'http://localhost:3000/edit-profile'
];

console.log('Testing pages...');

pages.forEach(async (url, index) => {
  try {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(url);
    console.log(`${url}: ${response.status} ${response.statusText}`);
  } catch (error) {
    console.log(`${url}: Error - ${error.message}`);
  }
});

console.log('Page tests completed!');
