export interface Category {
    id: string;
    name:string;
    type: 'expense' | 'income';
    icon_name?:string;
}