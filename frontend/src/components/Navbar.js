"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@chakra-ui/react");
const icons_1 = require("@chakra-ui/icons");
const react_router_dom_1 = require("react-router-dom");
const react_2 = __importDefault(require("react"));
const useLogout_1 = require("../hooks/useLogout");
const useAuthContext_1 = require("../hooks/useAuthContext");
function Navbar() {
    const { colorMode, toggleColorMode } = (0, react_1.useColorMode)();
    const location = (0, react_router_dom_1.useLocation)();
    const [isLargerThan768] = (0, react_1.useMediaQuery)("(min-width: 768px)");
    const isActiveLink = (path) => {
        return location.pathname === path;
    };
    const navStyles = {
        position: "fixed",
        height: "60px",
        zIndex: "2",
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(128, 128, 128, 0.5)",
        borderRadius: "40px",
        p: "32px",
        mt: "10px",
        width: "90%",
    };
    const iconStyles = {
        display: 'flex',
        alignItems: 'center',
    };
    const getLinkColor = (path) => {
        if (isActiveLink(path)) {
            return colorMode === "dark" ? (isActiveLink(path) ? "white" : "grey") : (isActiveLink(path) ? "black" : "grey");
        }
        return colorMode === "dark" ? "grey" : "grey";
    };
    const { logout } = (0, useLogout_1.useLogout)();
    const { user } = (0, useAuthContext_1.useAuthContext)();
    const handleClick = () => {
        logout();
    };
    return (react_2.default.createElement(react_1.Flex, { sx: navStyles, alignItems: "center" },
        !isLargerThan768 && (react_2.default.createElement(react_1.Flex, { alignItems: "center", width: "100%" },
            react_2.default.createElement(react_1.Heading, { ml: "-20px" },
                react_2.default.createElement(react_1.Box, { fontSize: "33px", color: colorMode === "dark" ? "blue.500" : "blue.500", transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black" } },
                    react_2.default.createElement("a", { href: "/" }, "Kevin Hu"))),
            react_2.default.createElement(react_1.Button, { variant: "ghost", onClick: toggleColorMode, mr: "3%", transition: "background-color 0.3s ease", _hover: { bg: colorMode === 'dark' ? 'gray.800' : 'gray.200' } }, colorMode === 'light' ? react_2.default.createElement(icons_1.MoonIcon, null) : react_2.default.createElement(icons_1.SunIcon, null)),
            react_2.default.createElement(react_1.Menu, null,
                react_2.default.createElement(react_1.MenuButton, { as: react_1.IconButton, "aria-label": 'Options', icon: react_2.default.createElement(icons_1.HamburgerIcon, null), variant: 'outline' }),
                react_2.default.createElement(react_1.MenuList, null,
                    react_2.default.createElement(react_1.MenuItem, { as: "a", href: "/" }, "Profile"),
                    react_2.default.createElement(react_1.MenuItem, { as: "a", href: "/About" }, "About Me"),
                    react_2.default.createElement(react_1.MenuItem, { as: "a", href: "/Contact" }, "Contact"),
                    react_2.default.createElement(react_1.MenuItem, null,
                        react_2.default.createElement(react_1.Button, { onClick: handleClick }, "Logout")))))),
        isLargerThan768 && (react_2.default.createElement(react_2.default.Fragment, null,
            react_2.default.createElement(react_1.Heading, { as: "h1", ml: "20px" },
                react_2.default.createElement(react_1.Box, { mx: 8, fontSize: "33px", color: colorMode === "dark" ? "blue.500" : "blue.500", transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black" } },
                    react_2.default.createElement("a", { href: "/" }, "Kevin Hu"))),
            react_2.default.createElement(react_1.Spacer, null),
            react_2.default.createElement(react_1.Flex, { align: "center" },
                react_2.default.createElement(react_1.Box, { mx: 8, fontSize: "20px", color: getLinkColor("/"), transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black", fontWeight: "bold" }, fontWeight: isActiveLink("/") ? "bold" : "normal" },
                    react_2.default.createElement("a", { href: "/" }, "Contacts")),
                react_2.default.createElement(react_1.Box, { mx: 8, fontSize: "20px", color: getLinkColor("/About"), transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black", fontWeight: "bold" }, fontWeight: isActiveLink("/About") ? "bold" : "normal" },
                    react_2.default.createElement("a", { href: "/About" }, "Add")),
                user && (react_2.default.createElement(react_1.Box, null,
                    react_2.default.createElement(react_1.Box, null, user.email),
                    react_2.default.createElement(react_1.Button, { onClick: handleClick }, "Logout"))),
                !user && (react_2.default.createElement(react_1.Box, null,
                    react_2.default.createElement(react_1.Box, { mx: 8, fontSize: "20px", color: getLinkColor("/login"), transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black", fontWeight: "bold" }, fontWeight: isActiveLink("/About") ? "bold" : "normal" },
                        react_2.default.createElement("a", { href: "/login" }, "Login")),
                    react_2.default.createElement(react_1.Box, { mx: 8, fontSize: "20px", color: getLinkColor("/login"), transition: "color 0.3s ease, font-weight 0.3s", _hover: { color: colorMode === "dark" ? "white" : "black", fontWeight: "bold" }, fontWeight: isActiveLink("/About") ? "bold" : "normal" },
                        react_2.default.createElement("a", { href: "/signup" }, "Signup"))))),
            react_2.default.createElement(react_1.Spacer, null),
            react_2.default.createElement(react_1.HStack, { alignItems: "center" },
                react_2.default.createElement(react_1.Button, { variant: "ghost", onClick: toggleColorMode, mr: "50px", transition: "background-color 0.3s ease", _hover: { bg: colorMode === 'dark' ? 'gray.800' : 'gray.200' } }, colorMode === 'light' ? react_2.default.createElement(icons_1.MoonIcon, null) : react_2.default.createElement(icons_1.SunIcon, null)))))));
}
exports.default = Navbar;
