import Sidebar from '@/components/Sidebar'
import { Avatar, Button, ChakraProvider, Flex, FormControl, Heading, Input, Text } from '@chakra-ui/react'
import React from 'react'

const TopBar = () => {
    return (
        <Flex bg={'gray.100'} h='80px' w={'100%'} align='center' p={5}>
            <Avatar marginEnd={3} />
            <Heading size={'lg'}>SomeFella@gmail.com</Heading>
        </Flex>
    )
}

const BottomBar = () => {
    return (
        <FormControl bg={'blue.200'} w='100%' p={3}>
            <Input type={'Type a message...'} autoComplete='off' />
            <Button type='submit' hidden>Sumbit</Button>
        </FormControl>
    )
}

const ChatId = () => {
    return (
        <ChakraProvider>
            <Flex h={'100vh'}>
                <Sidebar />
                <Flex bg={'blue.100'} flex={1} direction='column'>
                    <TopBar />
                    <Flex flex={1} direction='column' pt={4} mx={5}>
                        <Flex bg={'green.200'} w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1}>
                            <Text>how ya doin'</Text>
                        </Flex>
                        <Flex bg={'green.200'} w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1}>
                            <Text>tell me</Text>
                        </Flex>
                        <Flex bg={'gray.200'} w='fit-content' minWidth={'100px'} borderRadius='lg' p={3} m={1}
                            alignSelf='end'>
                            <Text>good bros</Text>
                        </Flex>
                    </Flex>
                    <BottomBar />
                </Flex>
            </Flex>
        </ChakraProvider>
    )
}

export default ChatId