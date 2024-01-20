let host = '';

if (process.env.NODE_ENV === 'development') {
    host = "http://localhost:8080/api";
    console.log('Development mode active');
} else if (process.env.NODE_ENV === 'production') {
    //Modify the host here to deploy on a different "server"
    host = "http://raspberrypi:8080/api";
}

class RestClient {

    host: string;

    constructor(host: string) {
        this.host = host;
    }

    get<T>(url: string, headers: Record<string, string> = {'Content-Type': 'application/json'}): Promise<T> {
        return fetch(
            this.host + url,
            {headers: headers}
        ).then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            } else {
                return response.json() as Promise<T>
            }
        });
    }

    post<T, S>(url: string, body: T, headers: Record<string, string> = {'Content-Type': 'application/json'}): Promise<S> {
        return fetch(this.host + url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: headers,
        }).then(response => {
            if (response.status == 204) {
                return {} as Promise<S>
            } else if (response.status == 200) {
                return response.json() as Promise<S>
            } else {
                console.log('response status is ' + response.status)
                throw new Error(response.statusText)
            }
        });
    }
}

export const staticRestClient = new RestClient(host);