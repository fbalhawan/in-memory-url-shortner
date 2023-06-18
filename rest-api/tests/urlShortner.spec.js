const request = require('supertest');
const HOST = 'http://localhost:3001';
let encodedUrl;
describe('GET /encode/:url', () => {
  it('responds with json', async () => {
    const url = 'finn.com'
    const response = await request(HOST)
      .get(`/api/encode/finn.com`)
      .expect('Content-Type', /json/)
      .expect(200);
      encodedUrl = response.body.encoded;
  });
});

describe('GET /decode/:url', () => {
  it('responds with 302 redirect', async () => {
    const response = await request(HOST)
      .get(`/api/decode/${encodedUrl}`)
      .expect(302);
  });
});