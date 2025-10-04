import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';

describe('API health test', () => {
	test('POST /api/status returns 200', async () => {
		const res = await request(app)
			.get('/api/status')
			.set('Content-Type', 'application/json')
			.set('Accept', 'application/vnd.lxp.v1+json')
			.send();
		expect(res.status).toBe(200);
		expect(res.text).toEqual('OK');
	});
});
