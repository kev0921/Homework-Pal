import { Flex, Box, Heading, Spacer, HStack, useColorMode, IconButton, Icon, Button, useMediaQuery, Text,  Menu, MenuButton, MenuList, MenuItem, MenuItemOption, MenuGroup, MenuOptionGroup, MenuDivider, } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, useLocation } from "react-router-dom";
import { DiGithubBadge } from "react-icons/di";
import { BsLinkedin } from "react-icons/bs";
import React from "react";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const isActiveLink = (path: string) => {
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
  }

  const iconStyles = {
    display: 'flex', 
    alignItems: 'center',
  }

  const getLinkColor = (path: string) => {
    if (isActiveLink(path)) {
      return colorMode === "dark" ? (isActiveLink(path) ? "white" : "grey") : (isActiveLink(path) ? "black" : "grey")
    }
    return colorMode === "dark" ? "grey" : "grey";
  };

  return (
    <Flex sx={navStyles} alignItems="center">
      {/* Mobile Navbar */}
      {!isLargerThan768 && (
        <Flex alignItems="center" width="100%">
          <Heading ml="-20px">
            <Box fontSize="33px" color={colorMode === "dark" ? "blue.500" : "blue.500"} transition="color 0.3s ease, font-weight 0.3s" 
              _hover={{ color: colorMode === "dark" ? "white" : "black"}}>
              <a href="/">Kevin Hu</a>
            </Box>
          </Heading>

            <Button variant="ghost" onClick={toggleColorMode} mr="3%" transition="background-color 0.3s ease" _hover={{ bg: colorMode === 'dark' ? 'gray.800' : 'gray.200' }}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList>
              <MenuItem as="a" href="/">
                Profile
              </MenuItem>
              <MenuItem as="a" href="/About">
                About Me
              </MenuItem>
              <MenuItem as="a" href="/Contact">
                Contact
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      )}

      {/* Laptop Navbar */}
      {isLargerThan768 && (
        <>
          <Heading as="h1" ml="20px">
            <Box mx={8} fontSize="33px" color={colorMode === "dark" ? "blue.500" : "blue.500"} transition="color 0.3s ease, font-weight 0.3s" 
              _hover={{ color: colorMode === "dark" ? "white" : "black"}}>
              <a href="/">Kevin Hu</a>
            </Box>
          </Heading>

          <Spacer />

          <Flex align="center">
            <Box mx={8} fontSize="20px" color={getLinkColor("/")} transition="color 0.3s ease, font-weight 0.3s" 
              _hover={{ color: colorMode === "dark" ? "white" : "black", fontWeight: "bold"}} fontWeight={isActiveLink("/") ? "bold" : "normal"}>
              <a href="/">Contacts</a>
            </Box>

            <Box mx={8} fontSize="20px" color={getLinkColor("/About")} transition="color 0.3s ease, font-weight 0.3s" 
              _hover={{ color: colorMode === "dark" ? "white" : "black", fontWeight: "bold"}} fontWeight={isActiveLink("/About") ? "bold" : "normal"}>
              <a href="/About">Add</a>
            </Box>
          </Flex>

          <Spacer />

          <HStack alignItems="center">
            <Button variant="ghost" onClick={toggleColorMode} mr="50px" transition="background-color 0.3s ease" _hover={{ bg: colorMode === 'dark' ? 'gray.800' : 'gray.200' }}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            <Box display="flex" alignItems="center" mr="20px">
              <a href="https://www.linkedin.com/in/kevinhu04/" style={iconStyles}>
                <Icon as={BsLinkedin} boxSize={6} mr={5} color='blue.500' transition="color 0.3s ease" _hover={{ color: colorMode === "dark" ? "white" : "black" }}/>
              </a>
              <a href="https://github.com/kev0921" style={iconStyles}>
                <Icon as={DiGithubBadge} boxSize={10} mr={5} color='blue.500' transition="color 0.3s ease" _hover={{ color: colorMode === "dark" ? "white" : "black" }} />
              </a>
              <a href="https://www.instagram.com/kevinhu04/" style={iconStyles}>
                <Icon as={FaInstagram} boxSize={7} color='blue.500' transition="color 0.3s ease" _hover={{ color: colorMode === "dark" ? "white" : "black" }}/>
              </a>
            </Box>
          </HStack>     
        </>
      )}
    </Flex>
  )
}
