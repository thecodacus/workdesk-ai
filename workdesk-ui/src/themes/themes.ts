// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import { mode } from '@chakra-ui/theme-tools'
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'system',
    useSystemColorMode: true,
}

export const theme = extendTheme({
    config,
    styles: {
        global: (props: any) => ({
            'html, body': {
                backgroundColor: mode('gray.200', 'gray.800')(props),
                color: mode('gray.800', 'whiteAlpha.900')(props),
                lineHeight: 'tall',
            },
            a: {
                color: 'cyan.500',
            },
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('gray.200', 'gray.800')(props),
                lineHeight: 'base',
            },
            '*::placeholder': {
                color: mode('gray.400', 'whiteAlpha.400')(props),
            },
            '*, *::before, &::after': {
                borderColor: mode('gray.200', 'whiteAlpha.300')(props),
                wordWrap: 'break-word',
            },
        }),
    },
})