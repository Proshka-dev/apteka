import { getOrdersByUser, OrdersList } from "@/features/orders";
import { requireAuth } from "@/shared/lib/auth/dal";

export async function OrdersPage() {
	const session = await requireAuth();
	const orders = await getOrdersByUser(session.user.id);

	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Ваши заказы</h1>
			<OrdersList orders={orders} />
		</div>
	);
}