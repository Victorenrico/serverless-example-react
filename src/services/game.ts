import { AxiosResponse } from 'axios';
import api from './api';

interface IDynamoItem {
    Count: number;
    Items: IGame[];
    ScannedCount: number;
}

export interface IGame {
    id?: number;
    title: string;
    developer: string;
    release: string;
    plataform: string;
    description: string;
    genre: string;
}

async function create(data: IGame): Promise<void> {
    try {
        await api.post('/items', data);
    } catch (err) {
        throw Error('Error save item');
    }
}

async function list(): Promise<IGame[]> {
    try {
        const response: AxiosResponse<IDynamoItem> = await api.get('/items');
        return response.data.Items;
    } catch (err) {
        throw Error('Error list items');
    }
}

async function remove(id: number): Promise<void> {
    try {
        await api.delete(`/items/${id}`);
    } catch (err) {
        throw Error('Error remove item');
    }
}

export default {
    create,
    list,
    remove
}