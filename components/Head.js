const metaCharset = document.createElement('meta');
metaCharset.setAttribute('charset','UTF-8');

const metaName = document.createElement('meta');
metaName.setAttribute('name','viewport');
metaName.setAttribute('content','width=device-width, initial-scale=1.0');

const title = document.createElement('title');

const link = document.createElement('link');
link.setAttribute('rel','stylesheet');
link.setAttribute('href','css/style.css');

document.head.appendChild(metaCharset);
document.head.appendChild(metaName);
document.head.appendChild(link);
document.head.appendChild(title);

export {title};