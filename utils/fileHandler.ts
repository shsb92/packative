import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

export const readPostsFromFile = (): Post[] => {
    if (fs.existsSync(dataFilePath)) {
        const data = fs.readFileSync(dataFilePath, 'utf-8');
        return JSON.parse(data);
    }
    return [];
};

export const writePostsToFile = (posts: Post[]) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};