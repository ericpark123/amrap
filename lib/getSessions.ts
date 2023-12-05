export default async function getSessions(id: any) {
  const response = await import("@/app/api/sessions/notjoined/route")
  return await ((await response.GET(id)).json())
}