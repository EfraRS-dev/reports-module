export async function fetchReportData(type: "users" | "products") {
  try {
    const response = await fetch(`http://localhost:3000/report/${type}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`Error al obtener ${type}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Datos obtenidos:", data);
    return data; // aquí tienes el JSON de tu API
  } catch (error) {
    console.error("Error en fetchReportData:", error);
    throw error; // lo relanzas para manejarlo en el componente
  }
}
