/**
 * Custom hook to prevent body scrolling when modal is open
 * Uses position: fixed which is more reliable on iOS than overflow: hidden
 * Preserves scroll position when modal closes
 */

export function useBodyScrollLock() {
    const { useLayoutEffect } = React;
    useLayoutEffect(() => {
        // Get original body overflow style
        const originalStyle = window.getComputedStyle(document.body).overflow;

        // Capture current scroll position
        const scrollY = window.scrollY;

        // Prevent scrolling by fixing the body position
        // This is more reliable on iOS Safari than overflow: hidden alone
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        // Re-enable scrolling when component unmounts
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';

            // Restore scroll position
            window.scrollTo(0, scrollY);
        };
    }, []); // Empty dependency array ensures this runs only on mount and unmount
}
