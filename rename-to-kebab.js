/**
 * Renames all the folder and files from the current working directory to kebab case
 */

import fs from 'fs/promises';
import path from 'path';
import { kebabCase } from 'change-case';

// Function to recursively rename files and folders
async function renameCamelToKebab(dirPath) {
  const items = await fs.readdir(dirPath);

  for (const item of items) {
    const currentPath = path.join(dirPath, item);
    const stats = await fs.stat(currentPath);
    const isDirectory = stats.isDirectory();

    if (isDirectory) {
      // If it's a directory, simply rename it to kebab-case
      const kebabCaseName = kebabCase(item);
      try {
          if (currentPath !== path.join(dirPath, kebabCaseName)) await fs.rename(currentPath, path.join(dirPath, kebabCaseName));
    } catch (e) {
      console.log("can't rename " + currentPath);
    }
      // Recursively rename its contents
      await renameCamelToKebab(path.join(dirPath, kebabCaseName));
    } else {
      // If it's a file, split the name at the dot and convert the part before the dot to kebab-case
      let [fileNamePart, ...fileExtension] = item.split('.');
      fileExtension = fileExtension.join('.');
      if (fileNamePart) {
        const kebabCaseFileNamePart = kebabCase(fileNamePart);
        const newName = kebabCaseFileNamePart + (fileExtension ? `.${fileExtension}` : '');
        try {
            if (currentPath !== path.join(dirPath, newName)) await fs.rename(currentPath, path.join(dirPath, newName)); 
        } catch (e) {
          console.log("can't rename " + currentPath);
        }
      }
    }
  }
}
// Call the function to start the renaming process
renameCamelToKebab('.')
  .then(() => {
    console.log('Folder and file renaming complete.');
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });
