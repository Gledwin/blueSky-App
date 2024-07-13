"use client"

import { checkIfUserExists } from "@/services/checkIfUserExists";
import {
  Spinner,
  Text,
  Highlight,
  Heading,
  Box,
  Button,
  Flex,
  useToast,
  Card,
  CardBody,
  CardFooter,
  Stack,
  CardHeader,
  StackDivider,
  Spacer,
  Image,
  Tooltip,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Badge,
} from "@chakra-ui/react";
import { Suspense, useContext, useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import BecomeAUser from "@/app/become-a-user/page";
import { StekcitUser } from "@/entities/bookStoreUser";
import { getUserByWalletAddress } from "@/services/getUserByWalletAddress";
import { makeCreatingUser } from "@/services/makeCreatingUser";
import { useRouter } from "next/navigation";
import ProductItem from '@/components/products/productItem'
import data from '@/lib/data'

const ShowConnect = () =>{
  
  const [userExists, setUserExists] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const [userAddress, setUserAddress] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const { connect } = useConnect();

  const { address, isConnected } = useAccount();

  const [stekcitUser, setSteckitUser] = useState<StekcitUser | null>(null);


  


  const [isMakingCreatingUser, setIsMakingCreatingUser] = useState(false);

  // const attemptConnection = async () => {
  //   if (window.ethereum && window.ethereum.isMiniPay) {
  //     connect({ connector: injected({ target: "metaMask" }) });
  //   }
  // };

  //const wixClient= useWixClient()


  //useEffect(() => {
    //const getProducts = async () => {
     // const res = await wixClient.products.queryProducts().find();

      //console.log(res);

  //};
 // getProducts();

    //}, [wixClient]);


    

  const makeCreatingUserAndSet = async () => {
    setIsMakingCreatingUser(true);
    const isUserNowCreatingUser = await makeCreatingUser(address);

    if (isUserNowCreatingUser) {
      setIsMakingCreatingUser(false);

      toast({
        description: "You are now a creating user",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      setIsMakingCreatingUser(false);
      toast({
        description: "Failed. Please try again.",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
   
    useEffect(() => {
    const checkIfUserExistsAndSet = async () => {
      if (address) {
        const doesUserExist = await checkIfUserExists(address);
        setUserExists(doesUserExist);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };

    const fetchUserByWalletAddress = async () => {
      const fetchedStekcitUser = await getUserByWalletAddress(address, {
        _walletAddress: address as `0x${string}`,
      });

      setSteckitUser(fetchedStekcitUser);
    };

   

   


    checkIfUserExistsAndSet();
    fetchUserByWalletAddress();
  }, [
    address,
    userExists,
    stekcitUser,

  ]);


  if (!isConnected) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Box bgColor={"#FFD62C"}>
          <Flex className="flex flex-col items-center justify-center" h={8}>
            <Text
              ml={4}
              textColor={"black"}
              noOfLines={1}
              paddingRight={4}
              alignContent={"center"}
              alignItems={"center"}
              // onClick={attemptConnection}
            >
              {" "}
              Connected: <Badge>{isConnected.toString()}</Badge>
            </Text>
          </Flex>
        </Box>
      </main>
    );
  }

  // if (isLoading) {
  //   return (
  //     <main className="flex h-screen items-center justify-center">
  //       <Flex className="flex flex-col items-center" >
  //         <Text
  //           textColor={"black"}
  //           noOfLines={1}
  //           paddingRight={4}
  //           alignContent={"center"}
  //           alignItems={"center"}
  //         >
  //           Connected: {isConnected.toString()}
  //         </Text>
  //       </Flex>
  //       <Spinner />
  //     </main>
  //   );
  // }

  return (
    <>
    
    <Flex
        className="flex flex-col items-center justify-center"
        bgColor={"#FFD62C"}
        h={8}
      >
        <Text
          textColor={"black"}
          noOfLines={1}
          paddingRight={4}
          alignContent={"center"}
          alignItems={"center"}
        >
          Connected: <Badge>{isConnected.toString()}</Badge>
        </Text>
      </Flex>
    </>
  );
}

export default ShowConnect

