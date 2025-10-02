import type { Actions } from './$types';
import { fail, type Cookies } from "@sveltejs/kit";
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import config from '../../config/config';

const MAX_TOKEN_AGE = 60 * 15;
const MAX_REFRESH_TOKEN_AGE = 60 * 60 * 24 * 7;

const registerSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters long')
        .max(16, 'Password cannot exceed 16 characters')
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .trim(),
    email: z.email().trim(),
    confirmPassword: z.string().trim(),
    name: z.string().trim()
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: 'custom',
            message: "Passwords do not match",
        });
    }
});
const loginSchema = z.object({
    password: z.string().trim(),
    email: z.email().trim()
})

export const createAlias = (name: string) => {
    const words = name.split(' ');
    // If there is only one word, return the first two characters
    if (words.length < 2) {
        return words[0].slice(0, 2).toUpperCase();
    }

    // Return the first initial of the first and last word
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = Object.fromEntries(await request.formData());
        const result = loginSchema.safeParse(data);
        if (!result.success) return fail(400, { message: result.error.issues.map(e => e.message).join('\n'), error: true });
        const cookiesHeader = cookies.getAll().map(e => `${e.name}=${e.value}`).join(';') + ';';
        let res;
        try {
            res = await axios.post(`${config.api}/user/login`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookiesHeader
                }
            });
        } catch (err: unknown) {
            const error = err as AxiosError;
            return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
        }

        setTokenCookies(cookies, res.headers['set-cookie']);
        return { success: true, email: res.data.email, name: res.data.name, alias: createAlias(res.data.name) }
    },
    register: async ({ cookies, request }) => {
        const data = Object.fromEntries(await request.formData());
        const result = registerSchema.safeParse(data);
        if (!result.success) return fail(400, { message: result.error.issues.map(e => e.message).join('\n'), error: true });
        const cookiesHeader = cookies.getAll().map(e => `${e.name}=${e.value}`).join(';') + ';';
        let res;
        try {
            res = await axios.post(`${config.api}/user/register`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Cookie': cookiesHeader
                }
            });
        } catch (err) {
            const error = err as AxiosError;
            return fail(400, { message: (error.response?.data as { error: string }).error, error: true });
        }

        setTokenCookies(cookies, res.headers['set-cookie']);

        return { success: true, email: res.data.email, name: res.data.name, alias: createAlias(res.data.name) }
    },
    logout: async ({ cookies }) => {
        cookies.delete('refreshToken', { path: '/' });
        cookies.delete('accessToken', { path: '/' });
        return { success: true, email: '', name: '', alias: 'P' }
    }
} satisfies Actions;

const setTokenCookies = (cookies: Cookies, cookiesHeader: string[]) => {
    const token = cookiesHeader[0].split(';')[0].split('=')[1];
    const refreshToken = cookiesHeader[1].split(';')[0].split('=')[1];

    if (token === null || refreshToken === null) return;

    cookies.set('accessToken', token, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: MAX_TOKEN_AGE,
    });

    cookies.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config.nodeEnv === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: MAX_REFRESH_TOKEN_AGE,
    });
}