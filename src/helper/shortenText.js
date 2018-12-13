const shortenText = text => text.length >= 10 ? `${text.substring(0,10)}...` : text;

export default shortenText;