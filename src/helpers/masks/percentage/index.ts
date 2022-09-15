import { formatToNumber } from 'brazilian-values';

const format = (numberInPercentage: number): string => `${formatToNumber(numberInPercentage)}%`;

export { format };
