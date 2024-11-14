
type StatsProp = {
    score: number;
}

export function StatsDisplay({score}: StatsProp) {
    return (
    <>
    
    <p class="scoreDisplay">Score: {score}</p>
    
    </>)
}