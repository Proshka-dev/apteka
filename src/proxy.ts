// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies"; // Утилита для проверки наличия cookie

export function proxy(request: NextRequest) {
    // Список защищенных маршрутов
    const protectedPaths = ['/dashboard', '/admin', '/api/protected'];
    const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

    if (!isProtectedPath) {
        return NextResponse.next();
    }

    // 1. Быстрая проверка наличия cookie сессии
    // Функция getSessionCookie просто проверяет наличие cookie, не обращаясь к БД
    const hasSession = getSessionCookie(request.headers); 
    
    if (!hasSession) {
        // Если cookie нет, сразу редиректим на страницу входа
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. (Опционально) Простая проверка пути для администратора
    // Это просто пример для быстрого редиректа, а не для безопасного разграничения доступа
    if (request.nextUrl.pathname.startsWith("/admin")) {
        // Здесь мы НЕ проверяем роль в БД, так как это замедлит proxy.
        // Мы просто даем шанс попасть на страницу /admin, где более строгая проверка 
        // в DAL его либо пустит, либо нет.
        return NextResponse.next(); 
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api/auth|_next/static|favicon.ico).*)'], // Исключаем статические файлы и роуты аутентификации
};