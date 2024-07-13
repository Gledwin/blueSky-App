"use client"

import userCartService from "@/lib/hooks/userCart"
import Link from "next/link"
import React, {useEffect, useState} from "react"
import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";


const Menu = () =>{
 


     const {items } = userCartService()
     const [mounted, setMounted] = useState(false)
     
     useEffect(() => {
        setMounted(true)

     },[])

     const { connect } = useConnect();

     const { isOpen, onOpen, onClose } = useDisclosure();
   
     const [isMiniPay, setIsMiniPay] = useState(false);
   
     useEffect(() => {
       if (
         window.ethereum &&
         (window.ethereum.isMiniPay || window.ethereum.isMinipay)
       ) {
         setIsMiniPay(true);
         connect({ connector: injected({ target: "metaMask" }) });
       }
     }, []);
     
     
     
     
 

     return (
        <div>
            <ul className="flex items-stretch gap-4 ">
                <li>
                <Link className="btn btn-ghost rounded-btn" href="/cart">
                Cart 
                {mounted && items.length != 0 && (
                    <div className="badge badge-secondary">
                        {items.reduce((a, c) => a + c.qty, 0)}{''}
                    </div>
                )}
                </Link>
                </li>
                <li> 
            {/* <IconButton
              _hover={{
                bgColor: "#FFD62C",
              }}
              color={"white"}
              bgColor={"white"}
              size={"md"}
              icon={
                colorMode === "light" ? (
                  <MoonIcon color={"black"} />
                ) : (
                  <SunIcon color={"black"} />
                )
              }
              aria-label={"Change Color Mode"}
              // display={{ md: "none" }}
              onClick={toggleColorMode}
              marginRight={4}
            /> */}

            {!isMiniPay ? (
              <div className = "btn btn-ghost rounded-btn">
              <ConnectButton
                chainStatus="none"
                accountStatus={{
                  smallScreen: "avatar",
                  largeScreen: "avatar",
                }}
                showBalance={{
                  smallScreen: false,
                  largeScreen: true,
                }}
                label="Connect"
              />
              </div>
            ) : (
              <div style={{ visibility: "hidden", pointerEvents: "none" }}>
                <ConnectButton
                  chainStatus="none"
                  accountStatus={{
                    smallScreen: "avatar",
                    largeScreen: "avatar",
                  }}
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                  label="Connect"
                />
              </div>
            )}
          
                </li>
            </ul>
        </div>
     )
}

export default Menu


