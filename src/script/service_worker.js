chrome.action.onClicked.addListener(tab => {

    const url = new URL(tab.url)
    const domain = url.origin

    chrome.cookies.getAll({url: domain}, cookies => {
        _clearCookies(cookies)
    })
})

const _clearCookies = cookies => {

    for (let cookie of cookies) {

        const url = `http${(cookie.secure ? 's' : '')}://${cookie.domain}${cookie.path}`

        chrome.cookies.remove({url, name: cookie.name})
            .then(console.log)
    }
}