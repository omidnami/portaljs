export default class Upload {
    private max_size:number|string;
    private access_type:any[] = [];
    private file:any = null;
    private path:string = '';
    private encrypt_name:boolean = true;
    private orginalName:string = 'image';
    private orginalFormat:string = 'png';
    private orginalSize:string|number = 0;
    private newFileName:string = '';


     constructor(data:any){
        let envDataType = process.env.UPLOAD_TYPE || 'jpg,png'
        this.max_size = data.max_size || process.env.UPLOADS_MAX;
        this.access_type = data.type.length? data.type : envDataType.split(',');
        this.file = data.file;
        this.path = data.path || process.env.UPLOAD_DIR;
        this.encrypt_name = data.encrypt_name;
        if (!this.encrypt_name) {
            this.encrypt_name = true;
        }
    }

    async commit(){
        this.orginalName = await this.file.name;
        this.orginalFormat = await this.file.mimetype.split("/")[1];
        this.orginalSize = await this.file.size;//byte
        this.max_size = !this.max_size ? this.max_size = 999999999999 : this.max_size
        let size =  this.checkSize();
        let type =  await this.checkFormat();
        this.newFileName = this.orginalName
        if (!size) {
            return {status: size, type: 'checkSize' ,'msg': 'The file is large'}
        }
        if (!type) {
            return {status: type, type: 'checkFormat' ,'msg': 'The file format is invalid'}
        }
        if (this.encrypt_name) {
           let rename = await this.renameFile();
        }
        let upload = await this.UploadFile();
        if (!upload.status) {
        return {status: upload.status, type: 'UploadFile' ,'msg': upload.msg} 
        }
        return {status: true, type: 'Finished' ,'msg': 'uploaded successfully'}     
    }

    checkSize(){
        let checker = (Number(this.max_size) * 1000) >= Number(this.orginalSize)
        
        return checker;
    }

    async checkFormat(){
        if (!this.access_type.length) {
            return true;
        }
        let checker = this.orginalFormat === this.access_type.filter(e=> e === this.orginalFormat)[0]
        return checker;
    }

    renameFile(){
        let t = Date.now();
        this.newFileName = t+''+Math.ceil(Math.random()*50000)+this.orginalName;
    }

   async UploadFile(){
        try {
            await this.file.mv(`${this.path}/`+this.newFileName);
        } catch (error:any) {
            return {status:false, msg:error.message};
        }

        return {status:true, msg: 'file uploaded success'};
    }


}