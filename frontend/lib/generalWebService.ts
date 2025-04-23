'use server'

import { cookies } from "next/headers"

function getAuthHeaders() {
  const token = cookies().get('token')?.value
  if (!token) throw new Error("No se ha encontrado el token de autenticación")
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  }
}

export async function postAsync(endpoint: string | undefined, values: any) {
  if (!endpoint) throw new Error("La dirección del endpoint no está definida")

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return {
      success: true,
      message: json.message,
      data: json.data,
      token: json.token
    }
  } catch (error) {
    return { success: false, message: (error as Error).message || 'Error inesperado' }
  }
}

export async function postAsyncPublic(endpoint: string | undefined, values: any) {
  return postAsync(endpoint, values)
}

export async function postAsyncAuth(endpoint: string | undefined, values: any) {
  if (!endpoint) throw new Error("La dirección del endpoint no está definida")

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(values)
    })

    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return {
      success: true,
      message: json.message,
      data: json.data
    }
  } catch (error) {
    return { success: false, message: (error as Error).message || 'Error inesperado' }
  }
}

export async function getAsync(endpoint: string) {
  try {
    const response = await fetch(endpoint)
    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }
    return { success: true, response: json }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error inesperado" }
  }
}

export async function getAsyncAuth(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: getAuthHeaders()
    })

    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return { success: true, data: json }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error inesperado" }
  }
}

export async function putAsync(endpoint: string, values: any, successMessage?: string) {
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return {
      success: true,
      message: successMessage,
      response: json
    }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error inesperado" }
  }
}

export async function putAsyncAuth(endpoint: string, values: any, successMessage?: string) {
  try {
    const response = await fetch(endpoint, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(values),
    })

    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return {
      success: true,
      message: successMessage || json.message,
      data: json
    }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error inesperado" }
  }
}

export async function deleteAsyncAuth(endpoint: string) {
  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers: getAuthHeaders()
    })

    const json = await response.json()
    if (!response.ok) return { success: false, message: json.error }

    return { success: true, message: json.message }
  } catch (error) {
    return { success: false, message: (error as Error).message || "Error inesperado" }
  }
}
