import config from '../../config/config.json'

function getCurrentSession()
{
    return {
        token: window.localStorage.getItem("__rvst"),
        clientToken: window.localStorage.getItem("__rarvg_client")
    }
}

function setCurrentSession(session)
{
    window.localStorage.setItem("__rvst", session.token)
    window.localStorage.setItem("__rarvg_client", session.clientToken)
}

function hasActiveSession()
{
    const session = getCurrentSession();
    return !(session.token == null || session.clientToken == null)
}

function updateToken(token)
{
    window.localStorage.setItem("__rvst", token)
}

function performRequest(endpoint, body)
{
    return new Promise(res =>
    {
        fetch(config.endpoint.host + '/' + endpoint,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(body)
            })
            .then(r =>
            {
                if (r.status !== 200)
                    return r.text().then(response => res({success: false, content: response}))
                r.json().then(response =>
                {
                    res({success: true, content: response})
                })
            })
    })
}

function tryRegister(displayName, username, email, password, dateOfBirth)
{
    return new Promise(res =>
    {
        performRequest('register', {
            displayName: displayName,
            email: email,
            password: password,
            username: username,
            dateOfBirth: dateOfBirth
        }).then(response =>
        {
            if (!response.success)
                return res(response)
            return res({success: true, content: response.content.user})
        })
    })
}

function tryLogin(email, password)
{
    return new Promise(res =>
    {
        performRequest('login', {email: email, password: password}).then(response =>
        {
            if (!response.success)
                return res(response)
            setCurrentSession({token: response.content.token, clientToken: response.content.clientToken})
            return res({success: true, content: response.content.user})
        })
    })
}

function tryUserLoading()
{
    return new Promise(res =>
    {
        const session = getCurrentSession();
        if (!session.token || !session.clientToken)
            return res({success: false})

        performRequest('getUser', session).then(response =>
        {
            return res(response)
        })
    })
}

function updateProfile(components, sociallinks)
{
    return new Promise(res =>
    {
        const session = getCurrentSession();
        if (!session.token || !session.clientToken)
            return res({success: false})

        performRequest('update', {...session, components: components, sociallinks: sociallinks}).then(response =>
        {
            return res(response)
        })
    })
}

function validateSession()
{
    return new Promise(res =>
    {
        const session = getCurrentSession();
        if (!session.token || !session.clientToken)
            return res({success: false})

        performRequest('validate', session).then(response =>
        {
            if (!response.success)
                return res(response)
            updateToken(response.content.token)
            return res({success: true, content: response.content})
        })
    })
}

export {
    tryLogin, tryRegister, validateSession, tryUserLoading, hasActiveSession, updateProfile
}