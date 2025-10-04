import type { Cookies } from '@sveltejs/kit';
import type z from 'zod';

export interface HttpClientRequest {
	url: string;
	body: Record<string, string | number | boolean | object | null | undefined>;
	validator?: z.ZodObject;
	headers?: Record<string, string>;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	cookies?: Cookies;
}

export interface HttpClientResponse {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: Record<string, any>;
	success: boolean;
	error?: string;
	status: number;
}
