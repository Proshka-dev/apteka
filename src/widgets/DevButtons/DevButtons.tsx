import { Button, Icon } from "@/shared/ui";

export function DevButtons() {
	return (
		<div className="p-4">
			<div className="grid grid-cols-3 gap-4 items-center">
				{/* Заголовки */}
				<div className="font-bold">Вариант</div>
				<div className="font-bold">Размер</div>
				<div className="font-bold">Пример</div>

				{/* Пилюли */}
				<div>primary</div>
				<div>pill-50-bold-accent</div>
				<div><Button variant="primary" size="pill-50-bold-accent">Нажми меня</Button></div>

				<div>primary-green-shadow</div>
				<div>pill-50-bold-accent</div>
				<div><Button variant="primary-green-shadow" size="pill-50-bold-accent">Нажми меня</Button></div>

				<div>primary-green-shadow</div>
				<div>pill-40-bold-accent</div>
				<div><Button variant="primary-green-shadow" size="pill-40-bold-accent">Нажми меня</Button></div>

				<div>primary-grey-shadow</div>
				<div>pill-46-bold-accent</div>
				<div><Button variant="primary-grey-shadow" size="pill-46-bold-accent">Нажми меня</Button></div>

				{/* Прямоугольные */}
				<div>primary</div>
				<div>rect-33-bold-sans</div>
				<div><Button variant="primary" size="rect-33-bold-sans">Нажми меня</Button></div>

				<div>grey</div>
				<div>rect-33-sans</div>
				<div><Button variant="grey" size="rect-33-sans">Нажми меня</Button></div>

				<div>white</div>
				<div>rect-30-accent</div>
				<div><Button variant="white" size="rect-30-accent">Нажми меня</Button></div>

				{/* Outline пилюли */}
				<div>primary-outline</div>
				<div>pill-50-bold-accent</div>
				<div><Button variant="primary-outline" size="pill-50-bold-accent">Нажми меня</Button></div>

				<div>primary-outline</div>
				<div>pill-40-sans</div>
				<div><Button variant="primary-outline" size="pill-40-sans">Нажми меня</Button></div>

				<div>primary-outline</div>
				<div>pill-36-sans</div>
				<div><Button variant="primary-outline" size="pill-36-sans">Нажми меня</Button></div>

				{/* Квадратные */}
				<div>white</div>
				<div>square-40-sans</div>
				<div><Button variant="white" size="square-40-sans">Нажми меня</Button></div>

				<div>white</div>
				<div>square-27-sans</div>
				<div><Button variant="white" size="square-27-sans">Нажми меня</Button></div>

				{/* Вторичные пилюли */}
				<div>grey</div>
				<div>pill-30-sans</div>
				<div><Button variant="grey" size="pill-30-sans">Нажми меня</Button></div>

				<div>grey</div>
				<div>pill-30-sans-medium</div>
				<div><Button variant="grey" size="pill-30-sans-medium">Нажми меня</Button></div>

				<div>grey</div>
				<div>pill-25-sans</div>
				<div><Button variant="grey" size="pill-25-sans">Нажми меня</Button></div>

				{/* FullWidth */}
				<div>primary-black-shadow</div>
				<div>full-40-primary-shadow</div>
				<div><Button variant="primary-black-shadow" size="full-40-primary-shadow">Нажми меня</Button></div>

				<div>primary</div>
				<div>full-50-bottom-sans</div>
				<div><Button variant="primary" size="full-50-bottom-sans">Нажми меня</Button></div>

				<div>text-link</div>
				<div>full-40-link</div>
				<div><Button variant="text-link" size="full-40-link">Нажми меня</Button></div>

				<div>primary</div>
				<div>full-36-card-accent</div>
				<div><Button variant="primary" size="full-36-card-accent">Нажми меня</Button></div>

				<div>primary</div>
				<div>full-50-all-sans-bold</div>
				<div><Button variant="primary" size="full-50-all-sans-bold">Нажми меня</Button></div>

				{/* Иконки */}
				<div>icon-outline</div>
				<div>icon-50</div>
				<div><Button variant="icon-outline" size="icon-50"><Icon name="search" className="w-6 h-6" /></Button></div>

				<div>icon-outline</div>
				<div>icon-40</div>
				<div><Button variant="icon-outline" size="icon-40"><Icon name="menu" className="w-6 h-6" /></Button></div>

				<div>icon-outline-bw</div>
				<div>icon-40</div>
				<div><Button variant="icon-outline-bw" size="icon-40"><Icon name="keyboardArrowDown" className="w-5 h-5 rotate-90" /></Button></div>

				<div>icon-outline</div>
				<div>icon-29</div>
				<div><Button variant="icon-outline" size="icon-29"><Icon name="vk" className="w-3.25 h-2.25" /></Button></div>

				<div>icon-primary</div>
				<div>icon-50</div>
				<div><Button variant="icon-primary" size="icon-50"><Icon name="shoppingCart" className="w-5 h-5" /></Button></div>

				<div>icon-primary</div>
				<div>icon-46</div>
				<div><Button variant="icon-primary" size="icon-46"><Icon name="shoppingCart" className="w-5 h-5" /></Button></div>

				<div>icon-primary</div>
				<div>icon-25</div>
				<div><Button variant="icon-primary" size="icon-25"><Icon name="vk" className="w-3.25 h-2.25" /></Button></div>
			</div>
		</div>
	);
}