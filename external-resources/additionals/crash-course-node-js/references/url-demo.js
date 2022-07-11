let url = require('url');

let smUrl = new URL('https://some-website.com:8080/hello.html?id=11&status=active')

console.log(smUrl.href, smUrl.toString())

// host url
console.log(smUrl.host)

// host name, does not get port address
console.log(smUrl.hostname)

// path name
console.log(smUrl.pathname)

// serialized query
console.log(smUrl.search)

// params object
console.log(smUrl.searchParams)

// add param
smUrl.searchParams.append('abc', '123')
console.log(smUrl.searchParams)

// loop params
smUrl.searchParams.forEach((v,n) => console.log(`value: ${v} and name: ${n}`))