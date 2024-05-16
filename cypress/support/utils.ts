function getCountFromText(text: string): number {
    if(text[1] === 'F') {
        return Number(text.slice(19, text.length - 1))
    }

    else if (text[1] === 'U'){
        return Number(text.slice(21, text.length - 1))
    }
}

export default getCountFromText