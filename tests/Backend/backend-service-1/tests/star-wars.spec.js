import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { getAllCharacters } from '../service/requests';
import { validateResponse } from '../utils/apiValidation';

test('GET all characters from Star Wars API.', async ({ request }) => {
    let response;
    let startTime;

    await test.step("Generate User-Agent", async () => {
        const headers = { 'User-Agent': faker.internet.userAgent() };
        startTime = Date.now();  // Marca el tiempo antes de la request
        response = await getAllCharacters(request, headers);
    });

    await test.step("Validate status and response time of the request", async () => {
        await validateResponse(response, startTime);
    });

    await test.step("Log response body", async () => {
        console.log(await response.json());
    });
});

test('GET all characters.', async ({ request }) => {
    let response;
    let startTime;

    await test.step("Generate dynamic headers", async () => {
        const headers = { 'User-Agent': faker.internet.userAgent() };
        startTime = Date.now();  // Marca el tiempo antes de la request
        response = await getAllCharacters(request, headers);
    });

    await test.step("Validate status and response time", async () => {
        await validateResponse(response, startTime);
    });

    await test.step("Log response body", async () => {
        console.log(await response.json());
    });
});

test('GET all characters from people Star Wars API endpoint', async ({ request }) => {
    let response;
    let startTime;

    await test.step("Generate User-Agent to send as a header", async () => {
        const headers = { 'User-Agent': faker.internet.userAgent() };
        startTime = Date.now();  // Marca el tiempo antes de la request
        response = await getAllCharacters(request, headers);
    });

    await test.step("Validate status and response time of the request", async () => {
        await validateResponse(response, startTime);
    });

    await test.step("Log response body: Check on console", async () => {
        console.log(await response.json());
    });
});