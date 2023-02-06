'use client'

import Login from "@/components/Login";
import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <Login />
    </ChakraProvider>
  )
}
