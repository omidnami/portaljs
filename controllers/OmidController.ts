class OmidController {
    
    index(req:any, res:any, next:any) {
        res.json("hello OmidController")
    }
}

export default new OmidController()