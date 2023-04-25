const article = document.querySelector("article");
const name = 'alibaba';
const password = 'nobaba';
const usernameInputs = document.querySelectorAll('input#username, input#user, input#user-name, input[name="username"], input[name="user"], input[name="user-name"]');
const passwordInputs = document.querySelectorAll('input#pass, input#password, input[name="pass"], input[name="password"]');

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
    const text = article.textContent;
    const wordMatchRegExp = /[^\s]+/g; // Regular expression
    const words = text.matchAll(wordMatchRegExp);
    // matchAll returns an iterator, convert to array to get word count
    const wordCount = [...words].length;
    const readingTime = Math.round(wordCount / 200);
    const badge = document.createElement("p");
    // Use the same styling as the publish information in an article's header
    badge.classList.add("color-secondary-text", "type--caption");
    badge.textContent = `⏱️ ${readingTime} minsdasd read`;

    // Support for API reference docs
    const heading = article.querySelector("h1");
    // Support for article docs with date
    const date = article.querySelector("time")?.parentNode;

    (date ?? heading).insertAdjacentElement("afterend", badge);
}

if (usernameInputs) {
    usernameInputs.forEach(i => i.value = name);
}

if (passwordInputs) {
    passwordInputs.forEach(i => i.value = password);
}