import RouterProvider from "./RouterProvider"

export default class Provider {
    public App:any
    private Res:any
    private Req:any
    private Next:any
    constructor(private req?:any, private res?:any, private next?:any, private app?:any) {
        this.App = app
        this.Req = req
        this.Res = res
        this.Next = next
    }

    run(){
        const routerProvider = new RouterProvider(this.App)
        routerProvider.start(this.Req, this.Res, this.Next)
    }
}