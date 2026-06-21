import { ReactNode } from "react";

interface RepeatProps {
	times: number;
	// Проп render принимает функцию и возвращает JSX
	render: (index: number) => ReactNode;
}

export const Repeat = ({ times, render }: RepeatProps) => {
	// Создаем пустой массив для накопления результатов рендера
	const elements: ReactNode[] = [];

	for (let i = 0; i < times; i++) {
		// Вызываем функцию render для каждого индекса и пушим результат в массив
		elements.push(render(i));
	}

	return <>{elements}</>;
};
