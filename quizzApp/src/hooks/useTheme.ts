import {useResponsive} from "@Hooks/breakpoint";

export default function useTheme() {
    const {isTablet, isMobile} = useResponsive();
    return {
        isTablet: isTablet,
        isMobile: isMobile,
    };
}
