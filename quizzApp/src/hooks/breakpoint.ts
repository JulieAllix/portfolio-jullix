import useBreakpoint from "use-breakpoint";
/*
$large: 1440px;
$medium: 960px;
$tablet: 768px;
$mobile: 0px;
 */
const appBreakpoints = {
    mobile: 0,
    tablet: 768,
    medium: 960,
    large: 1440
}

export const useResponsive = () => {
    const {breakpoint} = useBreakpoint(appBreakpoints);

    return {
        isMobile: breakpoint === "mobile",
        isTablet: breakpoint === "tablet",
        isMedium: breakpoint === "medium",
        isLarge: breakpoint === "large",
        breakpoint
    }
}
