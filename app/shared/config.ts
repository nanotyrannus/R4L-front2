const config = {
    port : 3030,
    hostname : window.location.hostname
}

export const baseUrl = `http://${ config.hostname }:${ config.port }`

