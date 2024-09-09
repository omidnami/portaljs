import * as fs from 'fs/promises';
import * as path from 'path';

export default class RouterCli {
    protected name: string;
    private folderPath = './routers';

    constructor(name: string) {
        this.name = name;
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

        const writeFile = await this.setRouterCode();
        if (!writeFile) {
            return false;
        }

        const initCore = await this.initFileToCore();
        if (!initCore) {
            return false;
        }

        console.log(`Router ${this.name} is created successfully`);
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
        const filePath = path.join(this.folderPath, `${this.name}.ts`);

        try {
            await fs.access(filePath);
            console.error(`Error: File ${this.name} exists`);
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

    async setRouterCode(): Promise<boolean> {
        const content = `
        const express = require("express");
export const ${this.name}Router = express.Router();

${this.name}Router.get("/${this.name}", (req: any, res: any) => {
   res.json("hello ${this.name} router");
});
        `;
        const modelPath = path.join(this.folderPath, `${this.name}.ts`);

        try {
            await fs.writeFile(modelPath, content.trim());
            return true; // File written successfully
        } catch (err) {
            console.error('Error writing file', err);
            return false;
        }
    }

    async initFileToCore(): Promise<boolean> {
        const filePath = './providers/RouterProvider.ts';
        const importCode = `import { ${this.name}Router } from "../routers/${this.name}";\n`;
        const routerCode = `    this.App.use("/", ${this.name}Router);\n`;

        try {
            let data = await fs.readFile(filePath, 'utf8');
            const insertPosition = data.indexOf('// Router End');
            const insertImportPosition = data.indexOf('// Router Import End');

            if (insertPosition !== -1 && insertImportPosition !== -1) {
                data = data.slice(0, insertImportPosition) + importCode + data.slice(insertImportPosition);
                data = data.slice(0, insertPosition) + routerCode + data.slice(insertPosition);
                await fs.writeFile(filePath, data);
                return true;
            } else {
                console.error('Error: "// Router End" or "// Router Import End" comment not found');
                return false;
            }
        } catch (err) {
            console.error('Error reading or writing file', err);
            return false;
        }
    }
}

