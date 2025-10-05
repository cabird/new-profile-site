/**
 * Custom hook to detect iOS virtual keyboard height and update CSS custom property
 * This allows the UI to adjust when the keyboard appears/disappears
 */

export function useVirtualKeyboardHeight() {
    const { useEffect } = React;
    useEffect(() => {
        // Check if visualViewport is supported (modern browsers)
        if (!window.visualViewport) {
            return;
        }

        const onResize = () => {
            const viewportHeight = window.innerHeight;
            const visualViewportHeight = window.visualViewport.height;

            // Only treat as keyboard if difference is significant (> 150px)
            // This prevents false positives from orientation changes or browser chrome
            const isKeyboard = viewportHeight - visualViewportHeight > 150;
            const keyboardHeight = isKeyboard ? viewportHeight - visualViewportHeight : 0;

            // Set CSS custom property that can be used in styles
            document.documentElement.style.setProperty(
                '--keyboard-height',
                `${keyboardHeight}px`
            );
        };

        // Listen to visualViewport resize events
        window.visualViewport.addEventListener('resize', onResize);

        // Initial check
        onResize();

        // Cleanup listener on unmount
        return () => {
            window.visualViewport.removeEventListener('resize', onResize);
            // Reset the CSS variable
            document.documentElement.style.setProperty('--keyboard-height', '0px');
        };
    }, []);
}
