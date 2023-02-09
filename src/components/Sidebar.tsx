'use client'

import { ArrowLeftIcon } from '@chakra-ui/icons'
import { Avatar, Button, IconButton } from '@chakra-ui/react'
import { Text, Flex } from '@chakra-ui/layout'
import React from 'react'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
    const router = useRouter()

    const Chat = () => {
        return (
            <Flex p={3} _hover={{ bg: 'gray.100' }} cursor='pointer' align={'center'}
                onClick={() => router.push(`/chat/1`)}>
                <Avatar marginEnd={3} />
                <Text>SomeFella@gmail.com</Text>
            </Flex>
        )
    }

    return (
        <Flex w={'300px'}
            borderEnd={'1px solid'} borderColor='gray.200' direction={'column'}>

            <Flex w='100%' h='80px' align={'center'} justifyContent='space-between'
                p={3} borderBottom='1px solid' borderColor='gray.200'>
                <Flex align={'center'}>
                    <Avatar marginEnd={3} />
                    <Text>Sup</Text>
                </Flex>
                <IconButton size={'sm'} isRound icon={<ArrowLeftIcon />} aria-label={''} />
            </Flex>

            <Button marginBottom={5}>New Chat</Button>

            <Flex overflowY={'scroll'} direction='column' sx={{ scrollbarWidth: "none" }} flex={1}>
                <Chat />
            </Flex>

        </Flex>
    )
}

export default Sidebar