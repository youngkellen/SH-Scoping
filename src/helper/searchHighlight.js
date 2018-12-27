const searchHighlight = (text = "", match = "") => {
    // text.replace(/("[^"]*")/g,"<span>$1</span>")
    let searchText = text.toUpperCase()
    let searchMatch = match.toUpperCase()
    console.log(text, " search text")
    console.log(match, "search match")
    if (searchText.includes(searchMatch)){
        let replace =  new RegExp(match,"ig");
        console.log(replace, "replace")
        text = text.replace(replace, `<span class="highlight-search">${match}</span>`);
        console.log(text, "search highlight")
        return text
    } else {
        return text;
    }
    
}

export default searchHighlight;