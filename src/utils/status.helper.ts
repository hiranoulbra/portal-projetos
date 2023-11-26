

export const getColorByStatus = (status: string) => {
    switch (status) {

        case 'Em andamento':
            return 'rgb(59, 130, 246)';
        case 'Concluído':
            return 'rgb(22, 163, 74)';
        case 'Cancelado':
            return 'rgb(220, 38, 38)';
        default:
            return 'rgb(156, 163, 175)';
    }
}