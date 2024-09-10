import * as fs from 'fs/promises';
import * as path from 'path';

export default class InterfaceCli {
    protected name: string
    private folderPath = './interfaces';
    constructor(name:string){
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

        // const initCore = await this.initFileToCore();
        // if (!initCore) {
        //     return false;
        // }

        console.log(`Interface ${this.name} is created at interfaces dir successfully`);
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
        const filePath = path.join(this.folderPath, `${this.name}Inter.ts`);

        try {
            await fs.access(filePath);
            console.error(`Error: Interface ${this.name} exists in interfaces dir`);
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
/*

### Primitive Types
  string
  number
  boolean
  null
  undefined

### Arrays
  number[]
  string[]

### Tuples
  [number, string] 

### Objects
  { name: string; age: number; }

## Unions
  number | string
  
*/

export type ${this.name}Inter = {
    //name: string | undifine;
    //phone: number
  };
        `;
        const modelPath = path.join(this.folderPath, `${this.name}Inter.ts`);

        try {
            await fs.writeFile(modelPath, content.trim());
            return true; // File written successfully
        } catch (err) {
            console.error('Error writing file', err);
            return false;
        }
    }
    async initFileToCore(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}