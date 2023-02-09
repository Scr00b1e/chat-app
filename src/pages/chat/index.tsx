import Sidebar from '@/components/Sidebar'
import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'

const Main = () => {
    return (
        <ChakraProvider>
            <Sidebar />
        </ChakraProvider>
    )
}

export default Main