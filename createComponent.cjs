const fs = require('fs');
const path = require('path');

function toKebabCase(str) {
    return str.replace(/\s+/g, '-').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

function toCamelCase(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) return ''; // Remove leading spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
    });
}

const names = ['Component One', 'Component Two'];

names.forEach(name => {
    const kebabName = toKebabCase(name);
    const camelName = toCamelCase(name);
    const directoryPath = path.join(__dirname, kebabName);

    fs.mkdirSync(directoryPath);

    fs.writeFileSync(
        path.join(directoryPath, `${kebabName}.tsx`),
        `import styles from "./${kebabName}.module.scss";

export function ${camelName[0].toUpperCase() + camelName.substring(1)}() {
    return (
        <div className={styles.${camelName}}>
    
        </div>
    );
}`
    );

    fs.writeFileSync(
        path.join(directoryPath, 'index.ts'),
        `export * from "./${kebabName}";`
    );

    fs.writeFileSync(
        path.join(directoryPath, `${kebabName}.module.scss`),
        `.${camelName} {
    
}`
    );
});

console.log('Files and directories created successfully.');
