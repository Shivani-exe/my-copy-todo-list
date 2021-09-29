const expect = require('expect');
require('dotenv').config();
const getOrCreateAuthToken = require('../functions/utils/getOrCreateAuthToken');
const getTodos = require('../functions/getTodos');

describe('Netlify Functions', async () => {
  it('should get auth token', async () => {
    const results = await getOrCreateAuthToken();
    expect(results).toHaveProperty('authToken');
  });
  it('should return row not found if no todos exist for session', async () => {
    const event = {
      path: '/getTodos/123-123-123'
    };
    const results = await getTodos.handler(event);
    expect(results.body).toContain('no row found for');
  });
});
