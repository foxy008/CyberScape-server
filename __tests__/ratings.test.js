const request = require('supertest')
const app = require('../app')
const insertMockData = require('../lib/insertMockData')
const cleanup = require('../lib/cleanup')


beforeAll(async function() {
    await insertMockData()
})