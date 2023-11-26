import sql, { ISqlType } from 'mssql';
interface FilterBuilder {
    add: (condition: string, name: string, value: any, type: (() => ISqlType) | ISqlType) => FilterBuilder;
    orderBy: (field: string, order: 'ASC' | 'DESC') => FilterBuilder;
    build: () => string;
    paged: (page: number, size: number) => FilterBuilder;
}

export function createQuery(request: sql.Request, baseQuery: string): FilterBuilder {
    let query = '';
    let hasWhere = false;
    return {
        add: function (condition: string, name: string, value: any, type: (() => ISqlType) | ISqlType): FilterBuilder {
           
            if (!value) return this;
            request.input(name, type, value);
            query = query ? `${query} AND ${condition}` : condition;
            hasWhere = true;
            return this;
        },
        orderBy: function (field: string, order: 'ASC' | 'DESC'): FilterBuilder {
            query = `${query} ORDER BY ${field} ${order}`;
            return this;
        },
        paged: function (page: number, size: number): FilterBuilder {
            query = `${query} OFFSET ${page * size} ROWS FETCH NEXT ${size} ROWS ONLY`;
            return this;
        },
        build: function (): string {
            return `${baseQuery}${hasWhere ? ' WHERE ' : ''}${query}`;
        }
    };
}