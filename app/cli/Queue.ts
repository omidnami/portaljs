import * as fs from 'fs/promises';
import * as path from 'path';
export default class QueueCli {
    protected name : string
    private folderPath = './queues';

    constructor(name: string){
        this.name = name
    }

    async runCli() {
        const dirChecker = await this.checkOrMakeRootDir();
        if (!dirChecker) {
            return false;
        }

        const fileChecker = await this.checkOrCreateFile();
        if (!fileChecker) {
            return false;
        }

        const writeFile = await this.setCode();
        if (!writeFile) {
            return false;
        }

        const initCore = await this.initFileToCore();
        if (!initCore) {
            return false;
        }

        console.log(`Queue ${this.name} is created at queues dir successfully`);
        return true;
    }
    async checkOrMakeRootDir(): Promise<boolean> {
        try {
            await fs.access(this.folderPath);
            return true; // Folder exists
        } catch (err) {
            try {
                await fs.mkdir(this.folderPath);
                return true; // Folder created successfully
            } catch (mkdirErr) {
                console.error('Error creating folder', mkdirErr);
                return false;
            }
        }
    }
    async checkOrCreateFile(): Promise<boolean> {
        const filePath = path.join(this.folderPath, `${this.name}Queue.ts`);

        try {
            await fs.access(filePath);
            console.error(`Error: Queue ${this.name} exists in queues dir`);
            return false; // File exists
        } catch (err) {
            try {
                await fs.writeFile(filePath, '// Initial content');
                return true; // File created successfully
            } catch (writeErr) {
                console.error('Error creating file', writeErr);
                return false;
            }
        }
    }
    async setCode(): Promise<boolean> {
        const content = `
import { queue } from "../configs/queue";

export const ${this.name}Queue = (worker:number = 1) => {
    
    queue.process("${this.name}", worker, (job:any, done:any) => {
        // handel work hear
        console.log("${this.name} data job => ", job.id);
        done();
        
    }); 
}`;
        const modelPath = path.join(this.folderPath, `${this.name}Queue.ts`);

        try {
            await fs.writeFile(modelPath, content.trim());
            return true; // File written successfully
        } catch (err) {
            console.error('Error writing file', err);
            return false;
        }
    }
    async initFileToCore(): Promise<boolean> {
        const filePath = './configs/queue.ts';
        const importCode = `import { ${this.name}Queue } from "../queues/${this.name}Queue";\n`;
        const initCode = `\n    ${this.name}Queue();\n`;

        try {
            let data = await fs.readFile(filePath, 'utf8');
            const insertPosition = data.indexOf('// Queue End');
            const insertImportPosition = data.indexOf('// Import Queue End');

            if (insertPosition !== -1 && insertImportPosition !== -1) {
                data = data.slice(0, insertImportPosition) + importCode + data.slice(insertImportPosition);
                data = data.slice(0, insertPosition) + initCode + data.slice(insertPosition);
                await fs.writeFile(filePath, data);
                return true;
            } else {
                console.error('Error: "// Queue End" or "// Import Queue End" comment not found');
                return false;
            }
        } catch (err) {
            console.error('Error reading or writing file', err);
            return false;
        }
    }
}
