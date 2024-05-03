export function debounce<F extends (...args: any[]) => void>(func: F, wait: number,): (...args: Parameters<F>) => void {
    let timeoutId: number | null = null;
    return function (...args: Parameters<F>): void {
        const later = () => {
            timeoutId = null;
            func(...args);
        };
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(later, wait) as unknown as number;
    };
}
