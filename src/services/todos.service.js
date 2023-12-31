import httpService from "./http.service"

const todoesEndpoint = "todos"
const todosService = {
    fetch: async () => {
        const { data } = await httpService.get(todoesEndpoint, {
            params: {
                _page: 1,
                _limit: 10,
            },
        })
        return data
    },
    create: async (payload) => {
        const { data } = await httpService.post(todoesEndpoint, payload)
        return data
    },
}

export default todosService
