class TestController {
    
    index(req:any, res:any, next:any) {
        res.json("hello TestController")
    }
}

export default new TestController()