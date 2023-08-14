export async function getGameConfig( difficulty, stage, level ) {
  const response = await fetch(`http://localhost:8000/game_config/${difficulty}/${stage}/${level}`)
  return await response.json()
}
