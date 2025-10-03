import { describe, test, expect } from '@jest/globals';
import * as service from '../src/db/services/usersService';

describe('usersService', () => {
	test('should return the exactly 1 user by email', async () => {
		// Arrange: Mock the service to return a user
		let result = await service.getUserByEmail('test@example.com');

		// Assert: Check that the response methods were called correctly
		expect(result.id).toBe(3);
		expect(result.name).toBe('Joseph Woo');
	});
});
