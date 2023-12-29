export default function HasSingleQuote(string) {
    //This function returns true if there is a single quote in the input string and false if not
    return /'/g.test(string);
}
