export interface Note {
    name: string;
    text: string;
    author: string;
    created_dt: Date;
    updated_dt: Date;
}

export interface NoteBE extends Note {
    id?: number;
}

export interface NoteFE extends Note {
    id: number
}