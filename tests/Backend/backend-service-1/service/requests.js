import { requestConfig } from '../config/config.js';

/**
 * Función genérica para realizar peticiones HTTP con Playwright.
 * @param {import('@playwright/test').Request} request - Objeto de request de Playwright.
 * @param {string} method - Método HTTP (GET, POST, PUT, DELETE).
 * @param {string} endpoint - Endpoint de la API.
 * @param {object} headersProps - Headers opcionales.
 * @param {object} body - Cuerpo de la petición (para POST y PUT).
 * @returns {Promise<Response>} - Respuesta de la API.
 */
async function apiRequest(request, method, endpoint, headersProps = {}, body = null) {
  const options = {
    method,
    ...requestConfig.wars(headersProps),
  };

  if (body) {
    options.data = body; // Agregar body si la request lo necesita
  }

  return request.fetch(`${requestConfig.baseURL}${endpoint}`, options);
}

/**
 * GET all characters
 */
export async function getAllCharacters(request, headersProps = {}) {
  return apiRequest(request, 'GET', '/people/', headersProps);
}

/**
 * GET a character by ID
 */
export async function getCharacterById(request, id, headersProps = {}) {
  return apiRequest(request, 'GET', `/people/${id}/`, headersProps);
}

/**
 * POST - Crear un nuevo personaje
 */
export async function createCharacter(request, body, headersProps = {}) {
  return apiRequest(request, 'POST', '/people/', headersProps, body);
}

/**
 * PUT - Actualizar un personaje existente
 */
export async function updateCharacter(request, id, body, headersProps = {}) {
  return apiRequest(request, 'PUT', `/people/${id}/`, headersProps, body);
}

/**
 * DELETE - Eliminar un personaje
 */
export async function deleteCharacter(request, id, headersProps = {}) {
  return apiRequest(request, 'DELETE', `/people/${id}/`, headersProps);
}
