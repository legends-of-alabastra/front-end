import React from 'react'
import ReactDOM from 'react-dom'
import MainWindow from './components/ui/MainWindow'
import {createGlobalStyle} from 'styled-components'
import {Reset} from 'styled-reset'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    body {
        margin: 0;
        padding: 0
    }
`

ReactDOM.render(
    <>
        <Reset />
        <GlobalStyle />
        <MainWindow />
    </>,
    document.getElementById('root'))