const fs = require('fs');
const path = require('path');

const targetDirs = [
    'src/features/analytics/components/tabs/budgets',
    'src/features/analytics/components/tabs/goals'
];

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (!file.endsWith('.tsx')) continue;
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');

        let modified = false;

        // 1. Add import if needed
        if (content.includes('const formatCurrency =') && !content.includes('@/lib/formatters')) {
            const importStmt = 'import { formatCurrency as globalFormatCurrency } from "@/lib/formatters";\n';
            
            // Find the last import
            const lastImportIndex = content.lastIndexOf('import ');
            if (lastImportIndex !== -1) {
                const nextNewline = content.indexOf('\n', lastImportIndex);
                content = content.slice(0, nextNewline + 1) + importStmt + content.slice(nextNewline + 1);
            } else {
                content = importStmt + content;
            }
        }

        // 2. Fix budget-history-chart.tsx which imports from dashboard-formatters
        if (content.includes('dashboard-formatters')) {
            content = content.replace(/import { formatCurrency } from "@\/features\/dashboard\/lib\/dashboard-formatters";/g, 'import { formatCurrency } from "@/lib/formatters";');
            modified = true;
        }

        // 3. Replace the local formatCurrency declaration
        const regex1 = /const\s+formatCurrency\s*=\s*\(\s*value\s*:\s*number\s*\)\s*=>\s*new\s+Intl\.NumberFormat\([^)]+\)\.format\(\s*value\s*\)\s*;/g;
        const regex2 = /const\s+formatCurrency\s*=\s*\(\s*value\s*:\s*number\s*\)\s*=>\s*\{\s*return\s+new\s+Intl\.NumberFormat\([^)]+\)\.format\(\s*value\s*\)\s*;\s*\}/g;
        const regex3 = /const\s+formatCurrency\s*=\s*\(\s*value\s*:\s*number\s*\)\s*=>\s*new\s+Intl\.NumberFormat\([\s\S]*?\}\)\.format\(\s*value\s*\)\s*;/g;

        const replacement = 'const formatCurrency = (value: number) => globalFormatCurrency(value, currency);';

        if (regex3.test(content)) {
            content = content.replace(regex3, replacement);
            modified = true;
        } else if (regex1.test(content)) {
            content = content.replace(regex1, replacement);
            modified = true;
        } else if (regex2.test(content)) {
            content = content.replace(regex2, replacement);
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Fixed', filePath);
        }
    }
}

targetDirs.forEach(processDir);
console.log('Done');
