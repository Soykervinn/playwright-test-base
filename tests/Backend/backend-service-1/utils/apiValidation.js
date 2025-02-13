import { expect } from '@playwright/test';

/**
 * Validar status code y response time
 * @param {Response} response - Respuesta de la API
 * @param {number} startTime - Tiempo en milisegundos cuando la request fue iniciada
 */
export async function validateResponse(response, startTime) {
  expect(response.status()).toBe(200);

  const responseTime = Date.now() - startTime;
  console.log(`⏳ Tiempo de respuesta: ${responseTime} ms`);
  
  expect(responseTime).toBeLessThan(3000); // 3 segundos como máximo
}