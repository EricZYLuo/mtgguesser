
type StatsProp = {
    score: number;
}

export function StatsDisplay({score}: StatsProp) {
    return (
    <>
    
    <p>Score: {score}</p>
    
    </>)
}