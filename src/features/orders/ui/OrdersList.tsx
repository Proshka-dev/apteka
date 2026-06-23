// import type { Order } from '@/entities/order/model/types';

export function OrdersList({ orders }: { orders: Order[] }) {
	if (orders.length === 0) return <p>У вас пока нет заказов.</p>;
	return (
		<ul className="space-y-4">
			{orders.map((order) => (
				<li key={order.id} className="border rounded p-4">
					<p>Заказ #{order.id} от {new Date(order.createdAt).toLocaleDateString()}</p>
					<p>Статус: {order.status}</p>
					<p>Сумма: {order.total} ₽</p>
				</li>
			))}
		</ul>
	);
}