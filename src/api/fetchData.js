const url = 'http://localhost:4000'

export const fetchGet = async (additional, query) => {

    let queryParams = ''
    let counter = 0

    for (let i in query) {
        queryParams += `${i}=${query[i]}`
        if(Object.entries(query).length - 1 === counter) {

        } else {
            queryParams += `&`
        }
        counter++
    }

    try{
        let res = await fetch(`${url}/${additional}${query ? `?${queryParams}` : ''}`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        })

        if (!res.ok) {
            const errRes = await res.json();
            const err = Error(errRes.error);
            err.status = res.status;
            throw err;
        }
        let resT = await res.json();
        return resT
    }catch(e){
        console.log(e.message)
        return []
    }
}